import { AppDataSource } from '../config/db';
import { EmailLog } from '../entities/EmailLog';
import { Repository } from 'typeorm';

export class EmailLogRepository {
  private static get repo(): Repository<EmailLog> {
    return AppDataSource.getRepository(EmailLog);
  }

  static async save(entry: Partial<EmailLog>): Promise<void> {
    await this.repo.save(this.repo.create(entry));
  }
}
