import { Router } from 'express';
import { ExternalServerController } from '../modules/admin/controllers/ExternalServerController';
import { NewsCategoryController } from '../controllers/newsCategory.controller';
import { requireSession } from '../middlewares/session.middleware';
import { authorizeAdmin } from '../middlewares/auth.middleware';
import { asyncHandler } from '../shared/utils/asyncHandler';
import { BlockedKeywordController } from '../modules/admin/controllers/BlockedKeywordController';
import { ModerationController } from '../modules/admin/controllers/ModerationController';

const router = Router();

router.use(requireSession, authorizeAdmin);

router.get('/external-servers', asyncHandler(ExternalServerController.getAll));
router.get('/external-servers/status', asyncHandler(ExternalServerController.getStatusList));
router.get('/external-servers/:id', asyncHandler(ExternalServerController.getById));
router.put('/external-servers/:id', asyncHandler(ExternalServerController.update));
router.delete('/external-servers/:id', asyncHandler(ExternalServerController.delete));

router.post('/news-categories', asyncHandler(NewsCategoryController.create));

router.get('/blocked-keywords', asyncHandler(BlockedKeywordController.getAll));
router.post('/blocked-keywords', asyncHandler(BlockedKeywordController.add));
router.delete('/blocked-keywords/:id', asyncHandler(BlockedKeywordController.remove));

router.get('/reports', requireSession, authorizeAdmin, asyncHandler(ModerationController.getReports));
router.post('/articles/:id/hide', requireSession, authorizeAdmin, asyncHandler(ModerationController.hideArticle));

// router.post('/news-categories/:id/toggle', requireSession, authorizeAdmin, asyncHandler(ModerationController.toggleVisibility));
// router.get('/news-categories/hidden', requireSession, authorizeAdmin, asyncHandler(ModerationController.getHiddenCategories));

router.get('/reports', requireSession, authorizeAdmin, ModerationController.getReportedArticles);
router.post('/articles/:id/hide', requireSession, authorizeAdmin, asyncHandler(ModerationController.hideArticle));

router.post('/news-categories/:id/toggle', requireSession, authorizeAdmin, ModerationController.toggleCategoryVisibility);
router.get('/news-categories/hidden', requireSession, authorizeAdmin, ModerationController.getHiddenCategories);


export default router;
