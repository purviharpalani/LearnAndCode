import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { UserSession } from '../entities/UserSession';
import { NewsCategory } from '../entities/NewsCategory';    
import { Notification } from '../entities/Notification';
import { NotificationConfig } from '../entities/NotificationConfig';    
import { ExternalServer } from '../entities/ExternalServer';
import { EmailLog } from '../entities/EmailLog';
import { ApiRequestLog } from '../entities/ApiRequestLog';
import { SearchHistory } from '../entities/SearchHistory';
import { SavedArticle } from '../entities/SavedArticle';
import { NewsArticle } from '../entities/NewsArticle';
// import all your entities here

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Purvi@123',
  database: process.env.DB_NAME || 'news_schema',
  entities: [User,
      UserSession,
      NewsArticle,
      NewsCategory,
      Notification,
      SavedArticle,
      SearchHistory,
      NotificationConfig,
      ExternalServer,
      EmailLog,
      ApiRequestLog],
  synchronize: true, 
  logging: true,
});

export const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('[DB] Connected to database');
  } catch (err) {
    console.error('[DB] Error connecting to database:', err);
    process.exit(1);
  }
};
