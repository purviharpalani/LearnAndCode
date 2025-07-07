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
exports.ArticleReportRepository = void 0;
const db_1 = require("../config/db");
const ArticleReport_1 = require("../entities/ArticleReport");
const NewsArticleRepository_1 = require("./NewsArticleRepository");
class ArticleReportRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(ArticleReport_1.ArticleReport);
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({ relations: ['article', 'user'] });
        });
    }
    static reportArticle(userId, articleId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = this.repo.create({ user: { id: userId }, article: { id: articleId }, reason });
            yield this.repo.save(report);
            yield NewsArticleRepository_1.NewsArticleRepository.incrementReportCount(articleId);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({
                relations: ['article', 'user'],
                order: { reported_at: 'DESC' },
            });
        });
    }
    static countReportsForArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.count({
                where: { article: { id: articleId } },
            });
        });
    }
    static createReport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = this.repo.create({
                article: data.article,
                user: data.user,
                reason: data.reason,
            });
            return this.repo.save(report);
        });
    }
}
exports.ArticleReportRepository = ArticleReportRepository;
