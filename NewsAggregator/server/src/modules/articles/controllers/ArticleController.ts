import { Request, Response } from 'express';
import { Logger } from '../../../infrastructure/logger/Logger';
import { CustomError } from '../../../core/errors/CustomError';
import { isValidDate } from '../../../shared/utils/validator';
import { IArticleService } from '../../../core/interfaces/IArticleService';
import { ArticleService } from '../services/ArticleService';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export class ArticleController {
  private static service: IArticleService = new ArticleService();
  private static logger = Logger.getInstance();

  static async getAll(req: Request, res: Response) {
    try {
      const result = await this.service.getAll();
      res.json(result);
    } catch (err) {
      this.logger.error('[GET ARTICLES] ' + (err as Error).message);
      res.status(500).json({ error: 'Failed to get articles' });
    }
  }

  static async saveArticle(req: Request, res: Response) {
    try {
      const user = req.user!;
      const { articleId } = req.body;

      if (!articleId || isNaN(articleId)) {
        throw new CustomError('Invalid articleId', 400);
      }

      await this.service.saveArticle(user, Number(articleId));
      res.json({ message: 'Article saved successfully' });
    } catch (err) {
      const status = err instanceof CustomError ? err.statusCode : 500;
      this.logger.error('[SAVE ARTICLE] ' + (err as Error).message);
      res.status(status).json({ error: (err instanceof Error ? err.message : String(err)) });
    }
  }

  static async getSaved(req: Request, res: Response) {
    try {
      const user = req.user!;
      const result = await this.service.getSavedArticles(user);
      res.json(result);
    } catch (err) {
      this.logger.error('[GET SAVED] ' + (err as Error).message);
      res.status(500).json({ error: 'Could not fetch saved articles' });
    }
  }

  static async getTodaysHeadlines(req: Request, res: Response) {
    try {
      const headlines = await this.service.getTodaysHeadlines();
      res.json(headlines);
    } catch (err) {
      this.logger.error('[TODAY HEADLINES] ' + (err as Error).message);
      res.status(500).json({ error: 'Could not fetch today\'s headlines' });
    }
  }

  static async getArticlesByDateRange(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate || !isValidDate(String(startDate)) || !isValidDate(String(endDate))) {
        throw new CustomError('Invalid or missing date range', 400);
      }

      const articles = await this.service.getByDateRange(String(startDate), String(endDate));
      res.json(articles);
    } catch (err) {
      const status = err instanceof CustomError ? err.statusCode : 500;
      this.logger.error('[DATE RANGE] ' + (err as Error).message);
      res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async searchArticles(req: Request, res: Response) {
    try {
      const { query, startDate = '', endDate = '', sortBy = 'recent' } = req.query;

      if (!query || typeof query !== 'string') {
        throw new CustomError('Query is required', 400);
      }

      const mappedSortBy =
        sortBy === 'recent' ? 'date' : (sortBy as 'likes' | 'dislikes' | 'date');

      const result = await this.service.search({
        query: query,
        startDate: String(startDate),
        endDate: String(endDate),
        sortBy: mappedSortBy,
      });

      res.json(result);
    } catch (err) {
      const status = err instanceof CustomError ? err.statusCode : 500;
      this.logger.error('[SEARCH] ' + (err as Error).message);
      res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async checkIfArticleSaved(req: Request, res: Response) {
    try {
      const user = req.user!;
      const articleId = parseInt(req.query.articleId as string, 10);
      if (!articleId || isNaN(articleId)) {
        throw new CustomError('Invalid articleId', 400);
      }

      const exists = await this.service.isArticleSaved(user.id, articleId);
      res.json({ exists });
    } catch (err) {
      const status = err instanceof CustomError ? err.statusCode : 500;
      this.logger.error('[CHECK SAVED] ' + (err as Error).message);
      res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
