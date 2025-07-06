import { AppDataSource } from '../config/db';
import { ApiRequestLog } from '../entities/ApiRequestLog';
import { Repository } from 'typeorm';

export class ApiRequestLogRepository {
  private static get repo(): Repository<ApiRequestLog> {
    return AppDataSource.getRepository(ApiRequestLog);
  }

  static async save(entry: Partial<ApiRequestLog>): Promise<void> {
    await this.repo.save(this.repo.create(entry));
  }
}
