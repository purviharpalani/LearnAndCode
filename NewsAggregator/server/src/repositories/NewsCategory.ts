import { AppDataSource } from '../config/db';
import { NewsCategory } from '../entities/NewsCategory';

export const NewsCategoryRepository = AppDataSource.getRepository(NewsCategory);
