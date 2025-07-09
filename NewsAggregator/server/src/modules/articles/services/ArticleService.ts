import { Logger } from '../../../infrastructure/logger/Logger';
import { CustomError } from '../../../core/errors/CustomError';
import { ArticleSearchParams } from '../../../shared/types/ArticleQueryParams';
import {
  NewsArticleRepository,
  SavedArticleRepository,
  BlockedKeywordRepository
} from '../../../repositories';
import { NewsArticle, User } from '../../../entities';
import { IArticleService } from '../../../core/interfaces/IArticleService';

export class ArticleService implements IArticleService {
  private logger = Logger.getInstance();

  async getAll(): Promise<NewsArticle[]> {
    const all = await NewsArticleRepository.findByCreatedSince(new Date(0));
    return this.filterVisible(all);
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
    const articles = saved.map((s) => s.article);
    return this.filterVisible(articles);
  }

  async getTodaysHeadlines(): Promise<NewsArticle[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const articles = await NewsArticleRepository.getByDateRange(
      today.toISOString(),
      tomorrow.toISOString()
    );
    return this.filterVisible(articles);
  }

  async getByDateRange(start: string, end: string): Promise<NewsArticle[]> {
    const articles = await NewsArticleRepository.getByDateRange(start, end);
    return this.filterVisible(articles);
  }

  async search(params: ArticleSearchParams): Promise<NewsArticle[]> {
    const { query, startDate, endDate, sortBy } = params;
    const articles = await NewsArticleRepository.searchWithFilters(query, startDate, endDate, sortBy);
    return this.filterVisible(articles);
  }

  async isArticleSaved(userId: number, articleId: number): Promise<boolean> {
    const result = await SavedArticleRepository.findByUserAndArticle(userId, articleId);
    return !!result;
  }

  private async filterVisible(articles: NewsArticle[]): Promise<NewsArticle[]> {
    const blocked = await BlockedKeywordRepository.getAll();
    const keywordList = blocked.map(b => b.keyword.toLowerCase());

    return articles.filter(article =>
      !article.is_hidden &&
      !article.categoryEntity?.is_hidden &&
      !keywordList.some(k =>
        (article.title?.toLowerCase().includes(k) || article.description?.toLowerCase().includes(k))
      )
    );
  }
}
