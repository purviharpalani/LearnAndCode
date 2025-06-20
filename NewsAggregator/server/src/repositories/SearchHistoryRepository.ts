import { AppDataSource } from '../config/db';
import { SearchHistory } from '../entities/SearchHistory';

export const SearchHistoryRepository = AppDataSource.getRepository(SearchHistory);
