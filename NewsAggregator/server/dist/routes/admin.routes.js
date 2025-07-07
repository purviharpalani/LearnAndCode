"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExternalServerController_1 = require("../modules/admin/controllers/ExternalServerController");
const newsCategory_controller_1 = require("../controllers/newsCategory.controller");
const session_middleware_1 = require("../middlewares/session.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const asyncHandler_1 = require("../shared/utils/asyncHandler");
const router = (0, express_1.Router)();
// 🔐 Apply auth + admin guard to all routes below
router.use(session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin);
// ----------------------
// 📡 External Servers
// ----------------------
router.get('/external-servers', (0, asyncHandler_1.asyncHandler)(ExternalServerController_1.ExternalServerController.getAll));
router.get('/external-servers/status', (0, asyncHandler_1.asyncHandler)(ExternalServerController_1.ExternalServerController.getStatusList));
router.get('/external-servers/:id', (0, asyncHandler_1.asyncHandler)(ExternalServerController_1.ExternalServerController.getById));
router.put('/external-servers/:id', (0, asyncHandler_1.asyncHandler)(ExternalServerController_1.ExternalServerController.update));
router.delete('/external-servers/:id', (0, asyncHandler_1.asyncHandler)(ExternalServerController_1.ExternalServerController.delete));
// router.get("/status", ExternalServerController.getStatus);
// ----------------------
// 🗂️ News Categories
// ----------------------
router.post('/news-categories', (0, asyncHandler_1.asyncHandler)(newsCategory_controller_1.NewsCategoryController.create));
exports.default = router;
