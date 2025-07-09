import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Logger } from '../infrastructure/logger/Logger';
import * as entities from '../entities';

const logger = Logger.getInstance();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Purvi@123',
  database: process.env.DB_NAME || 'news_aggregation',
  entities:[__dirname + '/../entities/*.{js,ts}'],
  synchronize: true,
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
