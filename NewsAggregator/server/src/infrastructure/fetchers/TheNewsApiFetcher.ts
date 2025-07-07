import axios from 'axios';
import { INewsFetcher } from '../../core/interfaces/INewsFetcher';
import { NewsArticle, NewsCategory } from '../../entities';
import { Logger } from '../logger/Logger';
import { AppDataSource } from '../../config/db';
import { ExternalServerRepository, BlockedKeywordRepository} from '../../repositories';

export class TheNewsApiFetcher implements INewsFetcher {
  private readonly apiKey = process.env.THE_NEWS_API_KEY || '';
  private logger = Logger.getInstance();
  private readonly serverId = 2;

  async fetchNews(): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      this.logger.error('Missing THE_NEWS_API_KEY');
      await ExternalServerRepository.updateStatus(this.serverId, false);
      return [];
    }

    const categoryRepo = AppDataSource.getRepository(NewsCategory);
    const generalCategory = await categoryRepo.findOneBy({ name: 'General' });

    if (!generalCategory) {
      await ExternalServerRepository.updateStatus(this.serverId, false);
      this.logger.error('[TheNewsAPI] General category not found in DB');
      return [];
    }

    try {
      const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
        params: {
          api_token: this.apiKey,
          locale: 'us',
          limit: 3,
        },
      });

      const articles = response.data.data || [];

      const blocked = await BlockedKeywordRepository.getAll();
      const blockedWords = blocked.map(b => b.keyword.toLowerCase());

      
      let mapped =  articles.map((article: any) => {
        const news = new NewsArticle();
        news.title = article.title;
        news.description = (article.description || '').slice(0, 1000);
        news.source = article.source || '';
        news.url = article.url || '';
        news.category = this.inferCategory(article);
        news.categoryEntity = generalCategory;
        news.created_at = new Date();
        return news;
      });
      
      mapped = mapped.filter((article: NewsArticle) => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return !blockedWords.some(word => text.includes(word));
      });

      await ExternalServerRepository.updateStatus(this.serverId, true);
      this.logger.info(`[TheNewsAPI] Fetched ${mapped.length} articles after filtering`);
      return mapped;

    } catch (err: any) {
      this.logger.error(`[TheNewsAPI] Error: ${err.message}`, { stack: err.stack });
      await ExternalServerRepository.updateStatus(this.serverId, false);
      return [];
    }
  }

  private inferCategory(article: any): string {
    const text = `${article.title} ${article.description}`.toLowerCase();

    if (text.includes('sports')) return 'sports';
    if (text.includes('entertainment')) return 'entertainment';
    if (text.includes('politics')) return 'politics';
    if (text.includes('business')) return 'business';
    if (text.includes('technology')) return 'technology';
    if (text.includes('health')) return 'health';
    if (text.includes('science')) return 'science';

    return 'general';
  }
}
