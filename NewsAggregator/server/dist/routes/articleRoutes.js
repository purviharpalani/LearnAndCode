"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/article.routes.ts
const express_1 = require("express");
const article_controller_1 = require("../controllers/article.controller");
const session_middleware_1 = require("../middlewares/session.middleware");
const router = (0, express_1.Router)();
router.get('/', session_middleware_1.requireSession, article_controller_1.ArticleController.getAll);
router.post('/save', session_middleware_1.requireSession, article_controller_1.ArticleController.saveArticle);
// router.get('/saved', requireSession, ArticleController.getSaved);
exports.default = router;
