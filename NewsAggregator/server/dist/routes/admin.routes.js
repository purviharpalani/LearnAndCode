"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const externalServer_controller_1 = require("../controllers/externalServer.controller");
const newsCategory_controller_1 = require("../controllers/newsCategory.controller");
const session_middleware_1 = require("../middlewares/session.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const asyncHandler_1 = require("../shared/utils/asyncHandler");
const router = (0, express_1.Router)();
// External Servers
router.get('/external-servers', session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin, (0, asyncHandler_1.asyncHandler)(externalServer_controller_1.ExternalServerController.getAll));
router.get('/external-servers/status', session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin, (0, asyncHandler_1.asyncHandler)(externalServer_controller_1.ExternalServerController.getStatusSummary));
router.put('/external-servers/:id', session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin, (0, asyncHandler_1.asyncHandler)(externalServer_controller_1.ExternalServerController.update));
router.delete('/external-servers/:id', session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin, (0, asyncHandler_1.asyncHandler)(externalServer_controller_1.ExternalServerController.delete));
// News Categories
router.post('/news-categories', session_middleware_1.requireSession, auth_middleware_1.authorizeAdmin, (0, asyncHandler_1.asyncHandler)(newsCategory_controller_1.NewsCategoryController.create));
exports.default = router;
