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
exports.NewsService = void 0;
const axios_1 = __importDefault(require("axios"));
const NewsArticle_1 = require("../entities/NewsArticle");
const db_1 = require("../config/db");
const articleRepo = db_1.AppDataSource.getRepository(NewsArticle_1.NewsArticle);
class NewsService {
    static fetchAndStoreNews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("NEWS API KEY", process.env.THE_NEWS_API_KEY);
                const apiKey = process.env.THE_NEWS_API_KEY;
                const response = yield axios_1.default.get('https://api.thenewsapi.com/v1/news/top', {
                    params: {
                        api_token: apiKey,
                        locale: 'in',
                        limit: 50
                    }
                });
                const newsItems = response.data.data;
                const articles = newsItems.map((item) => {
                    var _a;
                    const article = new NewsArticle_1.NewsArticle();
                    article.title = item.title;
                    article.description = item.description;
                    article.source = ((_a = item.source) === null || _a === void 0 ? void 0 : _a.name) || item.source;
                    article.url = item.url;
                    article.image_url = item.image_url || '';
                    article.category = item.category || 'general';
                    article.external_id = item.uuid || '';
                    return article;
                });
                yield articleRepo.save(articles);
                console.log(`[NewsService] Saved ${articles.length} articles`);
            }
            catch (error) {
                console.error('[NewsService] Error fetching or saving news:', error);
            }
        });
    }
}
exports.NewsService = NewsService;
