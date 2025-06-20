import express from 'express';
import { ArticleController } from '../controllers/article.controller';
import { requireSession } from '../middlewares/session.middleware'

const router = express.Router();

router.get('/', requireSession, ArticleController.getAll);
router.post('/save', requireSession, ArticleController.saveArticle);
router.get('/saved', requireSession, ArticleController.getSaved);

export default router;
