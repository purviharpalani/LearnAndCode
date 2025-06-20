import { AppDataSource } from '../config/db';
import { NewsArticle } from '../entities/NewsArticle';

export const ArticleRepository = {
  async findAll(): Promise<NewsArticle[]> {
    return await AppDataSource.getRepository(NewsArticle).find();
  },
  async findById(id: number): Promise<NewsArticle | null> {
    return await AppDataSource.getRepository(NewsArticle).findOneBy({ id });
  },
};
