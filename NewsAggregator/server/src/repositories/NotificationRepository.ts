import { AppDataSource } from '../config/db';
import { Notification } from '../entities/Notification';
import { Repository } from 'typeorm';

export class NotificationRepository {
  private static get repo(): Repository<Notification> {
    return AppDataSource.getRepository(Notification);
  }

  /**
   * Save a single notification
   */
  static create(data: Partial<Notification>): Notification {
  return this.repo.create(data);
}

  static async save(notification: Partial<Notification>): Promise<Notification> {
    const entry = this.repo.create(notification);
    return await this.repo.save(entry);
  }

  /**
   * Save multiple notifications
   */
  static async saveAll(notifications: Partial<Notification>[]): Promise<Notification[]> {
    const entries = this.repo.create(notifications);
    return await this.repo.save(entries);
  }

  /**
   * Find all notifications by a user
   */
  static async findByUser(userId: number): Promise<Notification[]> {
    return await this.repo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Check if notification was already sent for a given article to user
   */
  static async findByUserAndArticle(
    userId: number,
    articleId: number
  ): Promise<Notification | null> {
    return await this.repo.findOne({
      where: { user_id: userId, related_article_id: articleId },
    });
  }
}
