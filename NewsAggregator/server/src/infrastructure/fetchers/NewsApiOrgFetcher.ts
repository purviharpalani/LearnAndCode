import { INewsFetcher } from '../../core/interfaces/INewsFetcher';
import { NewsArticle, NewsCategory } from '../../entities';
import { Logger } from '../logger/Logger';
import { HttpClient } from '../http/HttpClient';
import { inferCategory } from '../../shared/utils/infercategory';
import { AppDataSource } from '../../config/db';

export class NewsApiOrgFetcher implements INewsFetcher {
  private readonly apiKey = process.env.NEWS_API_KEY || '62075ceceb4449638ea24a3acf33bcfa';
  private readonly categories = ['business', 'technology', 'entertainment', 'sports'];
  private readonly logger = Logger.getInstance();
  private readonly httpClient = new HttpClient('https://newsapi.org/v2');

  async fetchNews(): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      this.logger.error('Missing NEWS_API_KEY');
      return [];
    }

    const categoryRepo = AppDataSource.getRepository(NewsCategory);
    const generalCategory = await categoryRepo.findOneBy({ name: 'General' });

    if (!generalCategory) {
      this.logger.error('[NewsApiOrgFetcher] Default category "General" not found');
      return [];
    }

    const allArticles: NewsArticle[] = [];

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

        const mapped = articles.map((article: any) => {
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

        allArticles.push(...mapped);
        this.logger.info(`[NewsApiOrg] Fetched ${mapped.length} articles for category ${category}`);
      } catch (err: any) {
        this.logger.error(`[NewsApiOrg] Error fetching ${category}: ${err.message}`, { stack: err.stack });
      }
    }

    return allArticles;
  }
}
