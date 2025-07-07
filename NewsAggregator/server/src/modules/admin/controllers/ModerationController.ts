import { Request, Response } from 'express';
import { ArticleReportRepository, NewsArticleRepository } from '../../../repositories';

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
    //   this.logger.error('[REPORTED ARTICLES] ' + (err as Error).message);
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  }

  static async hideArticle(req: Request, res: Response) {
    const articleId = parseInt(req.params.id, 10);
    if (isNaN(articleId)) {
      return res.status(400).json({ error: 'Invalid article ID' });
    }

    await NewsArticleRepository.hide(articleId);
    res.json({ message: 'Article hidden successfully' });
  }
}
