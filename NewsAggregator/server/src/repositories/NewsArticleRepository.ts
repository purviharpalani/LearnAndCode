import { AppDataSource } from '../config/db';
import { NewsArticle } from '../entities/NewsArticle';
import { Repository, MoreThan } from 'typeorm';

export class NewsArticleRepository {
  private static get repo(): Repository<NewsArticle> {
    return AppDataSource.getRepository(NewsArticle);
  }

  static async findByCreatedSince(date: Date): Promise<NewsArticle[]> {
    return await this.repo.find({ where: { created_at: MoreThan(date) } });
  }

  static async findByUrls(urls: string[]): Promise<NewsArticle[]> {
    return await this.repo.find({ where: urls.map(url => ({ url })) });
  }

  static async save(article: NewsArticle) {
    return await this.repo.save(article);
  }

  static async saveAll(articles: Partial<NewsArticle>[]): Promise<NewsArticle[]> {
    const entries = this.repo.create(articles);
    return await this.repo.save(entries);
  }

  static async findById(id: number): Promise<NewsArticle | null> {
    return await this.repo.findOne({ where: { id } });
  }

  static async getByDateRange(start: string, end: string): Promise<NewsArticle[]> {
    return await this.repo.createQueryBuilder('article')
      .where('DATE(article.created_at) BETWEEN :start AND :end', { start, end })
      .orderBy('article.created_at', 'DESC')
      .getMany();
  }

  static async incrementReportCount(articleId: number): Promise<void> {
    await this.repo.increment({ id: articleId }, 'report_count', 1);

    const article = await this.repo.findOneBy({ id: articleId });
    if (article && article.report_count >= 5) {
      await this.repo.update({ id: articleId }, { is_hidden: true });
    }
  }

  static async hide(articleId: number): Promise<void> {
    await this.repo.update(articleId, { is_hidden: true });
  }

  static async unhide(articleId: number): Promise<void> {
    await this.repo.update(articleId, { is_hidden: false });
  }


  static async searchWithFilters(
    query: string,
    startDate?: string,
    endDate?: string,
    sortBy: 'likes' | 'dislikes' | 'recent' | 'date' = 'recent'
  ): Promise<NewsArticle[]> {
    let qb = this.repo.createQueryBuilder('article')
      .where('LOWER(article.title) LIKE :query OR LOWER(article.description) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });

    if (startDate && endDate) {
      qb = qb.andWhere('DATE(article.created_at) BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      });
    }

    const safeSort: 'likes' | 'dislikes' | 'recent' =
      sortBy === 'date' ? 'recent' : sortBy;

    if (safeSort === 'likes') {
      qb = qb.orderBy('article.likes', 'DESC');
    } else if (safeSort === 'dislikes') {
      qb = qb.orderBy('article.dislikes', 'DESC');
    } else {
      qb = qb.orderBy('article.created_at', 'DESC');
    }

    return await qb.getMany();
  }
}
