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
class ModerationController {
    static getReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield repositories_1.ArticleReportRepository.findAll();
            res.json(reports);
        });
    }
    static hideArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleId = parseInt(req.params.id, 10);
            if (isNaN(articleId)) {
                return res.status(400).json({ error: 'Invalid article ID' });
            }
            yield repositories_1.NewsArticleRepository.hide(articleId);
            res.json({ message: 'Article hidden successfully' });
        });
    }
}
exports.ModerationController = ModerationController;
