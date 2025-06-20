import axios from 'axios';
import { NewsArticle } from '../entities/NewsArticle';
import { AppDataSource } from '../config/db';
import { Repository } from 'typeorm';

const articleRepo: Repository<NewsArticle> = AppDataSource.getRepository(NewsArticle);

export class NewsService {
  static async fetchAndStoreNews(): Promise<void> {
    try {
        console.log("NEWS API KEY",process.env.THE_NEWS_API_KEY);
      const apiKey = process.env.THE_NEWS_API_KEY;

      const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
        params: {
          api_token: apiKey,
          locale: 'in',
          limit: 50
        }
      });

      const newsItems = response.data.data;

      const articles: NewsArticle[] = newsItems.map((item: any) => {
        const article = new NewsArticle();
        article.title = item.title;
        article.description = item.description;
        article.source = item.source?.name || item.source;
        article.url = item.url;
        article.image_url = item.image_url || '';
        article.category = item.category || 'general';
        article.external_id = item.uuid || '';
        return article;
      });

      await articleRepo.save(articles);
      console.log(`[NewsService] Saved ${articles.length} articles`);
    } catch (error) {
      console.error('[NewsService] Error fetching or saving news:', error);
    }
  }
}
