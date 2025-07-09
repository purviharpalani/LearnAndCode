import { AppDataSource } from '../config/db';
import { ExternalServer } from '../entities';

export class ExternalServerRepository {
  private static repo = AppDataSource.getRepository(ExternalServer);

  static async getAll(): Promise<ExternalServer[]> {
    return await this.repo.find();
  }

  static async createExternalServer(data: Partial<ExternalServer>) {
  return await this.repo.create(data);
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

  static async deleteById(id: number): Promise<void> {
    await this.repo.delete(id);
  }

    static async getStatusList(): Promise<Partial<ExternalServer>[]> {
    return await this.repo.find({
      select: ['id', 'name', 'is_active', 'last_accessed']
    });
  }

static async updateStatus(serverId: number, isActive: boolean): Promise<void> {
    await this.repo.update({ id: serverId }, {
      is_active: isActive,
      last_accessed: new Date(),
    });
  }

}
