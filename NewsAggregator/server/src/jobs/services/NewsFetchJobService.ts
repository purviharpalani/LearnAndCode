import { NewsService } from '../../modules/news/services/NewsService';
import { TheNewsApiFetcher } from '../../infrastructure/fetchers/TheNewsApiFetcher';
import { NewsApiOrgFetcher } from '../../infrastructure/fetchers/NewsApiOrgFetcher';
import { NewsArticle } from '../../entities';

export class NewsFetchJobService {
  private service: NewsService;

  constructor() {
    const fetchers = [new NewsApiOrgFetcher(), new TheNewsApiFetcher()];
    this.service = new NewsService(fetchers);
  }

  public async run(): Promise<NewsArticle[]> {
    return await this.service.fetchFromAllSources();
  }
}
