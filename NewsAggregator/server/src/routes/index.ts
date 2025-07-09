import { Router } from 'express';
import articleRoutes from './article.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/auth', authRoutes);

export default router;
