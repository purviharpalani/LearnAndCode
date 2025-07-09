import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { SignupDTO } from '../../../shared/types/SignupDTO';
import { LoginDTO } from '../../../shared/types/LoginDTO';
import { isValidEmail } from '../../../shared/utils/validator';
import { CustomError } from '../../../core/errors/CustomError';
import { Logger } from '../../../infrastructure/logger/Logger';
import { IAuthService } from '../../../core/interfaces/IAuthService';
import { UserRepository, UserSessionRepository } from '../../../repositories';

export class AuthService implements IAuthService {
  private logger = Logger.getInstance();

  async signup(data: SignupDTO): Promise<{ userId: number }> {
    const { email, username, password, role } = data;

    if (!email || !username || !password) {
      throw new CustomError('Email, username, and password are required', 400);
    }

    if (!isValidEmail(email)) {
      throw new CustomError('Invalid email format', 400);
    }

    const exists = await UserRepository.existsByEmailOrUsername(email, username);
    if (exists) {
      throw new CustomError('User already exists', 400);
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password_hash,
      role: role || 'user',
      is_active: true,
    };

    const saved = await UserRepository.save(newUser);
    this.logger.info(`User created successfully: ${saved.id}`);
    return { userId: saved.id };
  }

  async login(data: LoginDTO): Promise<{
    userId: number;
    username: string;
    role: string;
    sessionToken: string;
  }> {
    const { email, password } = data;

    if (!email || !password) {
      throw new CustomError('Email and password are required', 400);
    }

    const user = await UserRepository.findOneBy({ email });

    if (!user || !user.is_active) {
      throw new CustomError('Invalid credentials', 401);
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new CustomError('Invalid credentials', 401);
    }

    const sessionToken = uuidv4();
    const session = {
      session_token: sessionToken,
      user,
      is_active: true,
      expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
    };

    await UserSessionRepository.createAndSave(session);

    return {
      userId: user.id,
      username: user.username,
      role: user.role,
      sessionToken,
    };
  }
}
