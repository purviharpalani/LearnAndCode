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
const Logger_1 = require("../../../infrastructure/logger/Logger");
const CustomError_1 = require("../../../core/errors/CustomError");
const validator_1 = require("../../../shared/utils/validator");
const ArticleService_1 = require("../services/ArticleService");
class ArticleController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.getAll();
                res.json(result);
            }
            catch (err) {
                this.logger.error('[GET ARTICLES] ' + err.message);
                res.status(500).json({ error: 'Failed to get articles' });
            }
        });
    }
    static saveArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { articleId } = req.body;
                if (!articleId || isNaN(articleId)) {
                    throw new CustomError_1.CustomError('Invalid articleId', 400);
                }
                yield this.service.saveArticle(user, Number(articleId));
                res.json({ message: 'Article saved successfully' });
            }
            catch (err) {
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                this.logger.error('[SAVE ARTICLE] ' + err.message);
                res.status(status).json({ error: (err instanceof Error ? err.message : String(err)) });
            }
        });
    }
    static getSaved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const result = yield this.service.getSavedArticles(user);
                res.json(result);
            }
            catch (err) {
                this.logger.error('[GET SAVED] ' + err.message);
                res.status(500).json({ error: 'Could not fetch saved articles' });
            }
        });
    }
    static getTodaysHeadlines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headlines = yield this.service.getTodaysHeadlines();
                res.json(headlines);
            }
            catch (err) {
                this.logger.error('[TODAY HEADLINES] ' + err.message);
                res.status(500).json({ error: 'Could not fetch today\'s headlines' });
            }
        });
    }
    static getArticlesByDateRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                if (!startDate || !endDate || !(0, validator_1.isValidDate)(String(startDate)) || !(0, validator_1.isValidDate)(String(endDate))) {
                    throw new CustomError_1.CustomError('Invalid or missing date range', 400);
                }
                const articles = yield this.service.getByDateRange(String(startDate), String(endDate));
                res.json(articles);
            }
            catch (err) {
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                this.logger.error('[DATE RANGE] ' + err.message);
                res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
            }
        });
    }
    static searchArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, startDate = '', endDate = '', sortBy = 'recent' } = req.query;
                if (!query || typeof query !== 'string') {
                    throw new CustomError_1.CustomError('Query is required', 400);
                }
                const mappedSortBy = sortBy === 'recent' ? 'date' : sortBy;
                const result = yield this.service.search({
                    query: query,
                    startDate: String(startDate),
                    endDate: String(endDate),
                    sortBy: mappedSortBy,
                });
                res.json(result);
            }
            catch (err) {
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                this.logger.error('[SEARCH] ' + err.message);
                res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
            }
        });
    }
    static checkIfArticleSaved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const articleId = parseInt(req.query.articleId, 10);
                if (!articleId || isNaN(articleId)) {
                    throw new CustomError_1.CustomError('Invalid articleId', 400);
                }
                const exists = yield this.service.isArticleSaved(user.id, articleId);
                res.json({ exists });
            }
            catch (err) {
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                this.logger.error('[CHECK SAVED] ' + err.message);
                res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
            }
        });
    }
}
exports.ArticleController = ArticleController;
ArticleController.service = new ArticleService_1.ArticleService();
ArticleController.logger = Logger_1.Logger.getInstance();
