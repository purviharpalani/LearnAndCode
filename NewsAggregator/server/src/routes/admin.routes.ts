import { Router } from 'express';
import { ExternalServerController } from '../modules/admin/controllers/ExternalServerController';
import { NewsCategoryController } from '../controllers/newsCategory.controller';
import { requireSession } from '../middlewares/session.middleware';
import { authorizeAdmin } from '../middlewares/auth.middleware';
import { asyncHandler } from '../shared/utils/asyncHandler';

const router = Router();

// 🔐 Apply auth + admin guard to all routes below
router.use(requireSession, authorizeAdmin);

// ----------------------
// 📡 External Servers
// ----------------------
router.get('/external-servers', asyncHandler(ExternalServerController.getAll));
router.get('/external-servers/status', asyncHandler(ExternalServerController.getStatusSummary));
router.get('/external-servers/:id', asyncHandler(ExternalServerController.getById));
router.put('/external-servers/:id', asyncHandler(ExternalServerController.update));
router.delete('/external-servers/:id', asyncHandler(ExternalServerController.delete));

// ----------------------
// 🗂️ News Categories
// ----------------------
router.post('/news-categories', asyncHandler(NewsCategoryController.create));

export default router;
