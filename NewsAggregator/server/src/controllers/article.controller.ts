import { Request, Response } from 'express';
import { ArticleRepository } from '../repositories/ArticleRepository';
import { SavedArticleRepository } from '../repositories/SavedArticleRepository';
import { User } from '../entities/User';

export class ArticleController {
  static async getAll(req: Request, res: Response) {
    try {
      const articles = await ArticleRepository.findAll();
      res.json(articles);
    } catch (err) {
      console.error('[GET ARTICLES ERROR]', err);
      res.status(500).json({ error: 'Could not fetch articles' });
    }
  }

  static async saveArticle(req: Request, res: Response): Promise<void> {
  const user: User = (req as any).user;
  const { articleId } = req.body;

  try {
    const article = await ArticleRepository.findById(articleId);
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    const alreadySaved = await SavedArticleRepository.findByUserAndArticle(user.id, article.id);
    if (alreadySaved) {
      res.status(409).json({ error: 'Already saved' });
      return;
    }

    await SavedArticleRepository.save(user, article);
    res.json({ message: 'Article saved successfully' });
  } catch (err) {
    console.error('[SAVE ARTICLE ERROR]', err);
    res.status(500).json({ error: 'Could not save article' });
  }
}

  static async getSaved(req: Request, res: Response) {
    const user: User = (req as any).user;
    try {
      const savedArticles = await SavedArticleRepository.findByUser(user.id);
      res.json(savedArticles);
    } catch (err) {
      console.error('[GET SAVED ARTICLES ERROR]', err);
      res.status(500).json({ error: 'Could not fetch saved articles' });
    }
  }
}
