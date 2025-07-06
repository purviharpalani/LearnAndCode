import { NewsArticle, User } from '../../entities';
import { ArticleSearchParams } from '../../shared/types/ArticleQueryParams';

export interface IArticleService {
  getAll(): Promise<NewsArticle[]>;
  saveArticle(user: User, articleId: number): Promise<void>;
  getSavedArticles(user: User): Promise<NewsArticle[]>;
  getTodaysHeadlines(): Promise<NewsArticle[]>;
  getByDateRange(start: string, end: string): Promise<NewsArticle[]>;
  search(params: ArticleSearchParams): Promise<NewsArticle[]>;
  isArticleSaved(userId: number, articleId: number): Promise<boolean>;
}
