import { AppDataSource } from '../config/db';
import { UserSession } from '../entities/UserSession';
import { Repository } from 'typeorm';

export class UserSessionRepository {
  private static get repo(): Repository<UserSession> {
    return AppDataSource.getRepository(UserSession);
  }

  static async findByToken(token: string): Promise<UserSession | null> {
    return await this.repo.findOne({
      where: { session_token: token },
      relations: ['user'],
    });
  }

  static async createAndSave(session: Partial<UserSession>): Promise<UserSession> {
    const newSession = this.repo.create(session);
    return await this.repo.save(newSession);
  }

  static async invalidateAllForUser(userId: number): Promise<void> {
    await this.repo.update({ user_id: userId }, { is_active: false });
  }
}
