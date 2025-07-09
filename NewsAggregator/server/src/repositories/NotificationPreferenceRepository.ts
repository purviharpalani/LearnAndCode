import { AppDataSource } from '../config/db';
import { NotificationPreference } from '../entities/NotificationPreferences';
import { Repository } from 'typeorm';

export class NotificationPreferenceRepository {
  private static get repo(): Repository<NotificationPreference> {
    return AppDataSource.getRepository(NotificationPreference);
  }

  static async findByUser(userId: number): Promise<NotificationPreference[]> {
    return await this.repo.find({ where: { user_id: userId } });
  }
}
