import { INewsFetcher } from '../../../core/interfaces/INewsFetcher';
import { NewsArticleDTO } from '../../../shared/types/NewsArticleDTO';
import { Logger } from '../../../infrastructure/logger/Logger';
import { NewsArticleRepository } from '../../../repositories';
import { NewsArticle } from '../../../entities';

export class NewsService {
  private fetchers: INewsFetcher[];
  private logger = Logger.getInstance();

  constructor(fetchers: INewsFetcher[]) {
    this.fetchers = fetchers;
  }

  public async fetchFromAllSources(): Promise<NewsArticle[]> {
    const allSaved: NewsArticle[] = [];

    for (const fetcher of this.fetchers) {
      const fetcherName = fetcher.constructor.name;

      try {
        const articles = await fetcher.fetchNews();
        const validArticles = this.filterDuplicates(articles);
        const saved = await this.saveArticles(validArticles);

        allSaved.push(...saved);
        this.logger.info(`[NewsService] ${fetcherName} fetched ${saved.length} new articles`);
      } catch (error: any) {
        this.logger.error(`[NewsService] Error from ${fetcherName}`, {
          message: error.message,
          stack: error.stack,
        });
      }
    }

    return allSaved;
  }

  private filterDuplicates(articles: NewsArticleDTO[]): NewsArticleDTO[] {
    return articles.filter(article => !!article.title && !!article.url);
  }

  private async saveArticles(articles: NewsArticleDTO[]): Promise<NewsArticle[]> {
    const existing = await NewsArticleRepository.findByUrls(articles.map(a => a.url));
    const existingUrls = new Set(existing.map(a => a.url));
    const newArticles = articles.filter(a => !existingUrls.has(a.url));

    const savedEntities = await NewsArticleRepository.saveAll(newArticles);
    return savedEntities;
  }
}
