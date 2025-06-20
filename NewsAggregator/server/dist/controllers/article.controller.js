"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const ArticleRepository_1 = require("../repositories/ArticleRepository");
const SavedArticleRepository_1 = require("../repositories/SavedArticleRepository");
class ArticleController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield ArticleRepository_1.ArticleRepository.findAll();
                res.json(articles);
            }
            catch (err) {
                console.error('[GET ARTICLES ERROR]', err);
                res.status(500).json({ error: 'Could not fetch articles' });
            }
        });
    }
    static saveArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { articleId } = req.body;
            try {
                const article = yield ArticleRepository_1.ArticleRepository.findById(articleId);
                if (!article) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                const alreadySaved = yield SavedArticleRepository_1.SavedArticleRepository.findByUserAndArticle(user.id, article.id);
                if (alreadySaved) {
                    res.status(409).json({ error: 'Already saved' });
                    return;
                }
                yield SavedArticleRepository_1.SavedArticleRepository.save(user, article);
                res.json({ message: 'Article saved successfully' });
            }
            catch (err) {
                console.error('[SAVE ARTICLE ERROR]', err);
                res.status(500).json({ error: 'Could not save article' });
            }
        });
    }
    static getSaved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const savedArticles = yield SavedArticleRepository_1.SavedArticleRepository.findByUser(user.id);
                res.json(savedArticles);
            }
            catch (err) {
                console.error('[GET SAVED ARTICLES ERROR]', err);
                res.status(500).json({ error: 'Could not fetch saved articles' });
            }
        });
    }
}
exports.ArticleController = ArticleController;
