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
exports.ArticleService = void 0;
const Logger_1 = require("../../../infrastructure/logger/Logger");
const CustomError_1 = require("../../../core/errors/CustomError");
const repositories_1 = require("../../../repositories");
class ArticleService {
    constructor() {
        this.logger = Logger_1.Logger.getInstance();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const all = yield repositories_1.NewsArticleRepository.findByCreatedSince(new Date(0));
            return this.filterVisible(all);
        });
    }
    saveArticle(user, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield repositories_1.NewsArticleRepository.findById(articleId);
            if (!article)
                throw new CustomError_1.CustomError('Article not found', 404);
            const exists = yield repositories_1.SavedArticleRepository.findByUserAndArticle(user.id, article.id);
            if (exists)
                throw new CustomError_1.CustomError('Article already saved', 409);
            yield repositories_1.SavedArticleRepository.save(user, article);
            this.logger.info(`Article ${articleId} saved for user ${user.id}`);
        });
    }
    getSavedArticles(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = yield repositories_1.SavedArticleRepository.findByUser(user.id);
            const articles = saved.map((s) => s.article);
            return this.filterVisible(articles);
        });
    }
    getTodaysHeadlines() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const articles = yield repositories_1.NewsArticleRepository.getByDateRange(today.toISOString(), tomorrow.toISOString());
            return this.filterVisible(articles);
        });
    }
    getByDateRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield repositories_1.NewsArticleRepository.getByDateRange(start, end);
            return this.filterVisible(articles);
        });
    }
    search(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query, startDate, endDate, sortBy } = params;
            const articles = yield repositories_1.NewsArticleRepository.searchWithFilters(query, startDate, endDate, sortBy);
            return this.filterVisible(articles);
        });
    }
    isArticleSaved(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repositories_1.SavedArticleRepository.findByUserAndArticle(userId, articleId);
            return !!result;
        });
    }
    filterVisible(articles) {
        return __awaiter(this, void 0, void 0, function* () {
            const blocked = yield repositories_1.BlockedKeywordRepository.getAll();
            const keywordList = blocked.map(b => b.keyword.toLowerCase());
            return articles.filter(article => {
                var _a;
                return !article.is_hidden &&
                    !((_a = article.categoryEntity) === null || _a === void 0 ? void 0 : _a.is_hidden) &&
                    !keywordList.some(k => { var _a, _b; return (((_a = article.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(k)) || ((_b = article.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(k))); });
            });
        });
    }
}
exports.ArticleService = ArticleService;
