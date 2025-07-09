import { AppDataSource } from '../config/db';
import { SearchHistory } from '../entities/SearchHistory';
import { Repository } from 'typeorm';

export class SearchHistoryRepository {
  private static get repo(): Repository<SearchHistory> {
    return AppDataSource.getRepository(SearchHistory);
  }

  static async log(userId: number, query: string, results: number): Promise<void> {
    const entry = this.repo.create({
      user_id: userId,
      search_query: query,
      results_count: results,
    });
    await this.repo.save(entry);
  }
}
