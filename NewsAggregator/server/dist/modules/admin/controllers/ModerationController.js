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
exports.ModerationController = void 0;
const repositories_1 = require("../../../repositories");
const CustomError_1 = require("../../../core/errors/CustomError");
class ModerationController {
    static getReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield repositories_1.ArticleReportRepository.findAll();
            res.json(reports);
        });
    }
    static getReportedArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield repositories_1.ArticleReportRepository.getAll();
                res.json(reports);
            }
            catch (err) {
                res.status(500).json({ error: 'Failed to fetch reports' });
            }
        });
    }
    static hideArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = parseInt(req.params.id, 10);
                if (isNaN(articleId)) {
                    throw new CustomError_1.CustomError('Invalid article ID', 400);
                }
                const article = yield repositories_1.NewsArticleRepository.findById(articleId);
                if (!article) {
                    throw new CustomError_1.CustomError('Article not found', 404);
                }
                if (article.is_hidden) {
                    return res.status(200).json({ message: 'Article is already hidden' });
                }
                yield repositories_1.NewsArticleRepository.hide(articleId);
                res.status(200).json({ message: 'Article hidden successfully' });
            }
            catch (err) {
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                //   this.logger.error('[HIDE ARTICLE] ' + (err as Error).message);
                res.status(status).json({ error: err instanceof Error ? err.message : String(err) });
            }
        });
    }
}
exports.ModerationController = ModerationController;
