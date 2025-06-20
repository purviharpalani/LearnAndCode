import { AppDataSource } from '../config/db';
import { SavedArticle } from '../entities/SavedArticle';
import { NewsArticle } from '../entities/NewsArticle';
import { User } from '../entities/User';

export const SavedArticleRepository = {
  async findByUser(userId: number) {
    return await AppDataSource.getRepository(SavedArticle).find({
      where: { user: { id: userId } },
      relations: ['article'],
    });
  },
  async findByUserAndArticle(userId: number, articleId: number) {
    return await AppDataSource.getRepository(SavedArticle).findOne({
      where: { user: { id: userId }, article: { id: articleId } },
      relations: ['user', 'article'],
    });
  },
  async save(user: User, article: NewsArticle) {
    const repo = AppDataSource.getRepository(SavedArticle);
    const entry = repo.create({ user, article });
    await repo.save(entry);
  }
};
