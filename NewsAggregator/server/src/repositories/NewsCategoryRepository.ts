// src/repositories/NewsCategoryRepository.ts
import { AppDataSource } from '../config/db';
import { NewsCategory } from '../entities/NewsCategory';
import { Repository } from 'typeorm';

export class NewsCategoryRepository {
  private static get repo(): Repository<NewsCategory> {
    return AppDataSource.getRepository(NewsCategory);
  }

static async add(name: string): Promise<NewsCategory> {
    const category = this.repo.create({ name });
    return await this.repo.save(category);
  }

  static async findByName(name: string): Promise<NewsCategory | null> {
    return await this.repo.findOne({ where: { name } });
  }

  static async findAll(): Promise<NewsCategory[]> {
    return await this.repo.find();
  }
}
