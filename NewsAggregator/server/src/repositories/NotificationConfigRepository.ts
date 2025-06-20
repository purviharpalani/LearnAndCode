import { AppDataSource } from '../config/db';
import { NotificationConfig } from '../entities/NotificationConfig';

export const NotificationConfigRepository = AppDataSource.getRepository(NotificationConfig);
