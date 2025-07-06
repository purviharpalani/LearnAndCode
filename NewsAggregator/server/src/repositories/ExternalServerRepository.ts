import { AppDataSource } from '../config/db';
import { ExternalServer } from '../entities';

export class ExternalServerRepository {
  private static repo = AppDataSource.getRepository(ExternalServer);

  static async getAll(): Promise<ExternalServer[]> {
    return await this.repo.find();
  }

  static async getStatusSummary(): Promise<Partial<ExternalServer>[]> {
    return await this.repo.find({
      select: ['id', 'name', 'is_active', 'last_accessed'],
    });
  }

  static async findById(id: number): Promise<ExternalServer | null> {
    return await this.repo.findOneBy({ id });
  }

  static async update(id: number, data: Partial<ExternalServer>): Promise<void> {
    await this.repo.update({ id }, data);
  }

  static async updateApiKey(id: number, api_key: string): Promise<void> {
    await this.repo.update({ id }, { api_key });
  }

  static async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

    static async getStatusList(): Promise<Partial<ExternalServer>[]> {
    return await this.repo.find({
      select: ['id', 'name', 'is_active', 'last_accessed']
    });
  }
}
