import { INewsFetcher } from '../../core/interfaces/INewsFetcher';
import { NewsArticle, NewsCategory } from '../../entities';
import { Logger } from '../logger/Logger';
import { HttpClient } from '../http/HttpClient';
import { inferCategory } from '../../shared/utils/infercategory';
import { AppDataSource } from '../../config/db';
import { ExternalServerRepository } from '../../repositories';
import { BlockedKeywordRepository } from '../../repositories/BlockedKeywordRepository';

export class NewsApiOrgFetcher implements INewsFetcher {
  private readonly apiKey = process.env.NEWS_API_KEY || '62075ceceb4449638ea24a3acf33bcfa';
  private readonly categories = ['business', 'technology', 'entertainment', 'sports'];
  private readonly logger = Logger.getInstance();
  private readonly httpClient = new HttpClient('https://newsapi.org/v2');
  private readonly serverId = 1;

  async fetchNews(): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      this.logger.error('Missing NEWS_API_KEY');
      await ExternalServerRepository.updateStatus(this.serverId, false);
      return [];
    }

    const categoryRepo = AppDataSource.getRepository(NewsCategory);
    const generalCategory = await categoryRepo.findOneBy({ name: 'General' });

    if (!generalCategory) {
      this.logger.error('[NewsApiOrgFetcher] Default category "General" not found');
      await ExternalServerRepository.updateStatus(this.serverId, false);
      return [];
    }

    const allArticles: NewsArticle[] = [];
    let successCount = 0;

    for (const category of this.categories) {
      try {
        const data = await this.httpClient.get<any>('top-headlines', {
          params: {
            category,
            country: 'us',
            apiKey: this.apiKey,
          },
        });

        const articles = data.articles || [];

        let mapped = articles.map((article: any) => {
          const news = new NewsArticle();
          news.title = article.title;
          news.description = (article.description || '').slice(0, 1000);
          news.source = article.source?.name || '';
          news.url = article.url || '';
          news.category = inferCategory(`${article.title} ${article.description || ''}`);
          news.categoryEntity = generalCategory; 
          news.created_at = new Date();
          return news;
        });

        const blocked = await BlockedKeywordRepository.getAll();
        const blockedWords = blocked.map(b => b.keyword.toLowerCase());

        mapped = mapped.filter((article: NewsArticle) => {
          const text = `${article.title} ${article.description}`.toLowerCase();
          return !blockedWords.some(word => text.includes(word));
        });

        allArticles.push(...mapped);
        this.logger.info(`[NewsApiOrg] Fetched ${mapped.length} articles for category ${category}`);
        successCount++;
      } catch (err: any) {
        this.logger.error(`[NewsApiOrg] Error fetching ${category}: ${err.message}`, { stack: err.stack });
      }
    }

    const isActive = successCount > 0;
    await ExternalServerRepository.updateStatus(this.serverId, isActive);

    return allArticles;
  }
}
