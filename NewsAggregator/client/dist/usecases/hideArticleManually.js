"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideArticleManually = hideArticleManually;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
async function hideArticleManually() {
    const articleId = readline_sync_1.default.questionInt('Enter Article ID to hide: ');
    try {
        await ApiService_1.ApiService.hideArticle(articleId);
        console.log('Article hidden successfully.');
    }
    catch (err) {
        console.error('Failed to hide article:', err.message);
    }
}
