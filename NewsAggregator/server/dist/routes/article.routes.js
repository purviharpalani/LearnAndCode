"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_controller_1 = require("../controllers/article.controller");
const session_middleware_1 = require("../middlewares/session.middleware");
const router = express_1.default.Router();
router.get('/', session_middleware_1.requireSession, article_controller_1.ArticleController.getAll);
router.post('/save', session_middleware_1.requireSession, article_controller_1.ArticleController.saveArticle);
router.get('/saved', session_middleware_1.requireSession, article_controller_1.ArticleController.getSaved);
exports.default = router;
