import { AppDataSource } from '../config/db';
import { ExternalServer } from '../entities/ExternalServer';

export const ExternalServerRepository = AppDataSource.getRepository(ExternalServer);
