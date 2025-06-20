import { AppDataSource } from '../config/db';
import { NewsArticle } from '../entities/NewsArticle';

export const NewsArticleRepository = AppDataSource.getRepository(NewsArticle);
