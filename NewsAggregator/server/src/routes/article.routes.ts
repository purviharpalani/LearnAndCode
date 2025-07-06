import { Router } from 'express';
import { ArticleController } from '../modules/articles/controllers/ArticleController';
import { requireSession } from '../middlewares/session.middleware';

const router = Router();

router.get('/', requireSession, (req, res, next) =>
  ArticleController.getAll(req, res).catch(next)
);

router.post('/save', requireSession, (req, res, next) =>
  ArticleController.saveArticle(req, res).catch(next)
);

router.get('/saved', requireSession, (req, res, next) =>
  ArticleController.getSaved(req, res).catch(next)
);

router.get('/search', requireSession, (req, res, next) =>
  ArticleController.searchArticles(req, res).catch(next)
);

router.get('/headlines/today', (req, res, next) =>
  ArticleController.getTodaysHeadlines(req, res).catch(next)
);

router.get('/date', requireSession, (req, res, next) =>
  ArticleController.getArticlesByDateRange(req, res).catch(next)
);

router.get('/check-saved', requireSession, (req, res, next) =>
  ArticleController.checkIfArticleSaved(req, res).catch(next)
);

export default router;
