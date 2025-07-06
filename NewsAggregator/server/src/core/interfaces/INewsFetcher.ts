import { NewsArticleDTO } from '../../shared/types/NewsArticleDTO';

export interface INewsFetcher {
  fetchNews(): Promise<NewsArticleDTO[]>;
}
