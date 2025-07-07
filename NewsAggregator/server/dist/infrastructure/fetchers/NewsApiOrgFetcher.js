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
exports.NewsApiOrgFetcher = void 0;
const entities_1 = require("../../entities");
const Logger_1 = require("../logger/Logger");
const HttpClient_1 = require("../http/HttpClient");
const infercategory_1 = require("../../shared/utils/infercategory");
const db_1 = require("../../config/db");
const repositories_1 = require("../../repositories");
class NewsApiOrgFetcher {
    constructor() {
        this.apiKey = process.env.NEWS_API_KEY || '62075ceceb4449638ea24a3acf33bcfa';
        this.categories = ['business', 'technology', 'entertainment', 'sports'];
        this.logger = Logger_1.Logger.getInstance();
        this.httpClient = new HttpClient_1.HttpClient('https://newsapi.org/v2');
        this.serverId = 1;
    }
    fetchNews() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiKey) {
                this.logger.error('Missing NEWS_API_KEY');
                yield repositories_1.ExternalServerRepository.updateStatus(this.serverId, false);
                return [];
            }
            const categoryRepo = db_1.AppDataSource.getRepository(entities_1.NewsCategory);
            const generalCategory = yield categoryRepo.findOneBy({ name: 'General' });
            if (!generalCategory) {
                this.logger.error('[NewsApiOrgFetcher] Default category "General" not found');
                yield repositories_1.ExternalServerRepository.updateStatus(this.serverId, false);
                return [];
            }
            const allArticles = [];
            let successCount = 0;
            for (const category of this.categories) {
                try {
                    const data = yield this.httpClient.get('top-headlines', {
                        params: {
                            category,
                            country: 'us',
                            apiKey: this.apiKey,
                        },
                    });
                    const articles = data.articles || [];
                    const mapped = articles.map((article) => {
                        var _a;
                        const news = new entities_1.NewsArticle();
                        news.title = article.title;
                        news.description = (article.description || '').slice(0, 1000);
                        news.source = ((_a = article.source) === null || _a === void 0 ? void 0 : _a.name) || '';
                        news.url = article.url || '';
                        news.category = (0, infercategory_1.inferCategory)(`${article.title} ${article.description || ''}`);
                        news.categoryEntity = generalCategory;
                        news.created_at = new Date();
                        return news;
                    });
                    allArticles.push(...mapped);
                    this.logger.info(`[NewsApiOrg] Fetched ${mapped.length} articles for category ${category}`);
                    successCount++;
                }
                catch (err) {
                    this.logger.error(`[NewsApiOrg] Error fetching ${category}: ${err.message}`, { stack: err.stack });
                }
            }
            const isActive = successCount > 0;
            yield repositories_1.ExternalServerRepository.updateStatus(this.serverId, isActive);
            return allArticles;
        });
    }
}
exports.NewsApiOrgFetcher = NewsApiOrgFetcher;
