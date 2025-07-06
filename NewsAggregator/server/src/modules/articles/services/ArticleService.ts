import { Logger } from '../../../infrastructure/logger/Logger';
import { CustomError } from '../../../core/errors/CustomError';
import { Between, Like } from 'typeorm';
import { ArticleSearchParams } from '../../../shared/types/ArticleQueryParams';
import {
  NewsArticleRepository,
  SavedArticleRepository
} from '../../../repositories';
import { NewsArticle, User } from '../../../entities';
import { IArticleService } from '../../../core/interfaces/IArticleService';

export class ArticleService implements IArticleService {
  private logger = Logger.getInstance();

  async getAll(): Promise<NewsArticle[]> {
    return await NewsArticleRepository.findByCreatedSince(new Date(0)); // all articles
  }

  async saveArticle(user: User, articleId: number): Promise<void> {
    const article = await NewsArticleRepository.findById(articleId);
    if (!article) throw new CustomError('Article not found', 404);

    const exists = await SavedArticleRepository.findByUserAndArticle(user.id, article.id);
    if (exists) throw new CustomError('Article already saved', 409);

    await SavedArticleRepository.save(user, article);
    this.logger.info(`Article ${articleId} saved for user ${user.id}`);
  }

  async getSavedArticles(user: User): Promise<NewsArticle[]> {
    const saved = await SavedArticleRepository.findByUser(user.id);
    return saved.map((s) => s.article);
  }

  async getTodaysHeadlines(): Promise<NewsArticle[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await NewsArticleRepository.findByCreatedSince(today); // assume repo handles filter internally
  }

  async getByDateRange(start: string, end: string): Promise<NewsArticle[]> {
    return await NewsArticleRepository.getByDateRange(start, end);
  }

  async search(params: ArticleSearchParams): Promise<NewsArticle[]> {
    const { query, startDate, endDate, sortBy } = params;

    return await NewsArticleRepository.searchWithFilters(query, startDate, endDate, sortBy);
  }

  async isArticleSaved(userId: number, articleId: number): Promise<boolean> {
    const result = await SavedArticleRepository.findByUserAndArticle(userId, articleId);
    return !!result;
  }
}
