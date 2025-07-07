// src/repositories/BlockedKeywordRepository.ts
import { AppDataSource } from '../config/db';
import { BlockedKeyword } from '../entities/BlockedKeyword';

export class BlockedKeywordRepository {
  private static repo = AppDataSource.getRepository(BlockedKeyword);

  static async getAll(): Promise<BlockedKeyword[]> {
    return this.repo.find();
  }

  static async add(keyword: string): Promise<BlockedKeyword> {
    const entry = this.repo.create({ keyword });
    return await this.repo.save(entry);
  }

  static async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
