import { AppDataSource } from '../config/db';
import { SavedArticle } from '../entities/SavedArticle';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { NewsArticle } from '../entities/NewsArticle';

export class SavedArticleRepository {
  private static get repo(): Repository<SavedArticle> {
    return AppDataSource.getRepository(SavedArticle);
  }

  static async findByUser(userId: number): Promise<SavedArticle[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['article'],
    });
  }

  static async findByUserAndArticle(userId: number, articleId: number): Promise<SavedArticle | null> {
    return this.repo.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
      relations: ['user', 'article'],
    });
  }

  static async save(user: User, article: NewsArticle): Promise<SavedArticle> {
    const entry = this.repo.create({ user, article });
    return await this.repo.save(entry);
  }
}
