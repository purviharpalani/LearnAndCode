import { AppDataSource } from '../config/db';
import { EmailLog } from '../entities/EmailLog';

export const EmailLogRepository = AppDataSource.getRepository(EmailLog);
