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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheNewsApiFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const entities_1 = require("../../entities");
const Logger_1 = require("../logger/Logger");
const db_1 = require("../../config/db");
class TheNewsApiFetcher {
    constructor() {
        this.apiKey = process.env.THE_NEWS_API_KEY || 'uqgQ9WYPGxAHDRh5tw8mtldTUOfA5ZLv3lY175YR';
        this.logger = Logger_1.Logger.getInstance();
    }
    fetchNews() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiKey) {
                this.logger.error('Missing THE_NEWS_API_KEY');
                return [];
            }
            const categoryRepo = db_1.AppDataSource.getRepository(entities_1.NewsCategory);
            const generalCategory = yield categoryRepo.findOneBy({ name: 'General' });
            if (!generalCategory) {
                this.logger.error('[TheNewsAPI] General category not found in DB');
                return [];
            }
            try {
                const response = yield axios_1.default.get('https://api.thenewsapi.com/v1/news/top', {
                    params: {
                        api_token: this.apiKey,
                        locale: 'us',
                        limit: 3,
                    },
                });
                const articles = response.data.data || [];
                return articles.map((article) => {
                    const news = new entities_1.NewsArticle();
                    news.title = article.title;
                    news.description = (article.description || '').slice(0, 1000); // ✅ Truncate
                    news.source = article.source || '';
                    news.url = article.url || '';
                    news.category = this.inferCategory(article);
                    news.categoryEntity = generalCategory; // ✅ Assign for FK
                    news.created_at = new Date();
                    return news;
                });
            }
            catch (err) {
                this.logger.error(`[TheNewsAPI] Error: ${err.message}`, { stack: err.stack });
                return [];
            }
        });
    }
    inferCategory(article) {
        const text = `${article.title} ${article.description}`.toLowerCase();
        if (text.includes('sports'))
            return 'sports';
        if (text.includes('entertainment'))
            return 'entertainment';
        if (text.includes('politics'))
            return 'politics';
        if (text.includes('business'))
            return 'business';
        if (text.includes('technology'))
            return 'technology';
        if (text.includes('health'))
            return 'health';
        if (text.includes('science'))
            return 'science';
        return 'general';
    }
}
exports.TheNewsApiFetcher = TheNewsApiFetcher;
