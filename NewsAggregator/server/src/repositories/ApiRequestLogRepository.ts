import { AppDataSource } from '../config/db';
import { ApiRequestLog } from '../entities/ApiRequestLog';

export const ApiRequestLogRepository = AppDataSource.getRepository(ApiRequestLog);
