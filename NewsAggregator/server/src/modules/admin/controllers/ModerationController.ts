import { Request, Response } from 'express';
import { ArticleReportRepository, NewsArticleRepository } from '../../../repositories';
import { CustomError } from '../../../core/errors/CustomError';

export class ModerationController {
  static async getReports(req: Request, res: Response) {
    const reports = await ArticleReportRepository.findAll();
    res.json(reports);
  }

  static async getReportedArticles(req: Request, res: Response) {
    try {
      const reports = await ArticleReportRepository.getAll();
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  }

  static async hideArticle(req: Request, res: Response) {
    try {
      const articleId = parseInt(req.params.id, 10);
      if (isNaN(articleId)) {
        throw new CustomError('Invalid article ID', 400);
      }

      const article = await NewsArticleRepository.findById(articleId);
      if (!article) {
        throw new CustomError('Article not found', 404);
      }

      if (article.is_hidden) {
        return res.status(200).json({ message: 'Article is already hidden' });
      }

      await NewsArticleRepository.hide(articleId);
      res.status(200).json({ message: 'Article hidden successfully' });
    } catch (err) {
      const status = err instanceof CustomError ? err.statusCode : 500;
    //   this.logger.error('[HIDE ARTICLE] ' + (err as Error).message);
      res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
