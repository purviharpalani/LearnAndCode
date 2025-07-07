import { AppDataSource } from '../config/db';
import { ArticleReport } from '../entities/ArticleReport';
import { Repository } from 'typeorm';
import { NewsArticleRepository } from './NewsArticleRepository';

export class ArticleReportRepository {
    private static get repo(): Repository<ArticleReport> {
        return AppDataSource.getRepository(ArticleReport);
    }

    static async createReport(report: Partial<ArticleReport>): Promise<ArticleReport> {
        const entry = this.repo.create(report);
        return this.repo.save(entry);
    }

    static async countReportsForArticle(articleId: number): Promise<number> {
        return this.repo.count({ where: { article: { id: articleId } } });
    }

    static async findAll(): Promise<ArticleReport[]> {
        return this.repo.find({ relations: ['article', 'user'] });
    }

    static async reportArticle(userId: number, articleId: number, reason: string): Promise<void> {
        const report = this.repo.create({ user: { id: userId }, article: { id: articleId }, reason });
        await this.repo.save(report);

        await NewsArticleRepository.incrementReportCount(articleId);
    }
}