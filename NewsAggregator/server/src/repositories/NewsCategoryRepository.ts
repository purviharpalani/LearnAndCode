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

  static async exists(name: string): Promise<boolean> {
    const found = await this.repo.findOneBy({ name });
    return !!found;
  }

  static async findByName(name: string): Promise<NewsCategory | null> {
    return await this.repo.findOne({ where: { name } });
  }

  static async findAll(): Promise<NewsCategory[]> {
    return await this.repo.find();
  }

  static async update(id: number, updateFields: Partial<NewsCategory>): Promise<void> {
    await this.repo.update({ id }, updateFields);
  }

  static async toggleVisibility(id: number, hide: boolean): Promise<void> {
    await this.repo.update(id, { is_hidden: hide });
  }

  static async getHidden(): Promise<NewsCategory[]> {
    return await this.repo.find({ where: { is_hidden: true } });
  }

  static async getVisibleCategories(): Promise<NewsCategory[]> {
    return await this.repo.find({ where: { is_hidden: false } });
  }

}
