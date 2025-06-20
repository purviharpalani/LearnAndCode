import { AppDataSource } from '../config/db';
import { Notification } from '../entities/Notification';

export const NotificationRepository = AppDataSource.getRepository(Notification);
