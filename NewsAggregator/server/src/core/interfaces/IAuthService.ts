import { SignupDTO } from '../../shared/types/SignupDTO';
import { LoginDTO } from '../../shared/types/LoginDTO';

export interface IAuthService {
  signup(data: SignupDTO): Promise<{ userId: number }>;
  login(data: LoginDTO): Promise<{
    userId: number;
    username: string;
    role: string;
    sessionToken: string;
  }>;
}
