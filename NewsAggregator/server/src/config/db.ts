// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { User, UserSession, Notification, ExternalServer, NotificationPreference, EmailLog, ApiRequestLog, SearchHistory, SavedArticle, NewsArticle, ArticleReaction } from '../entities';

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || 'Purvi@123',
//   database: process.env.DB_NAME || 'news_schema',
//   entities: [User,
//       UserSession,
//       NewsArticle,
//       ArticleReaction,
//       Notification,
//       SavedArticle,
//       SearchHistory,
//       ExternalServer,
//       EmailLog,
//       ApiRequestLog],
//   synchronize: true, 
//   logging: false,
// });

// export const connectToDatabase = async () => {
//   try {
//     await AppDataSource.initialize();
//     console.log('[DB] Connected to database');
//   } catch (err) {
//     console.error('[DB] Error connecting to database:', err);
//     process.exit(1);
//   }
// };
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Logger } from '../infrastructure/logger/Logger';
import * as entities from '../entities';
// import { NewsCategory } from '../entities/NewsCategory';

const logger = Logger.getInstance();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Purvi@123',
  database: process.env.DB_NAME || 'news_aggregation',
  entities: [entities.User,
      entities.UserSession,
      entities.NewsArticle,
      entities.ArticleReaction,
      entities.NewsCategory,
      entities.Notification,
      entities.SavedArticle,
      entities.SearchHistory,
      entities.NotificationPreference,
      entities.ExternalServer,
      entities.EmailLog,
      entities.ApiRequestLog],
  synchronize: true, // ⚠️ Disable in production
  logging: false,
});

export const connectToDatabase = async (): Promise<void> => {
  try {
    console.log('DB Config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
});
    await AppDataSource.initialize();
    logger.info('[DB] Connection established successfully');
  } catch (err) {
    logger.error('[DB] Failed to connect to database', err);
    process.exit(1);
  }
};
