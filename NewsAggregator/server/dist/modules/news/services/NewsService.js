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
exports.NewsService = void 0;
const Logger_1 = require("../../../infrastructure/logger/Logger");
const repositories_1 = require("../../../repositories");
class NewsService {
    constructor(fetchers) {
        this.logger = Logger_1.Logger.getInstance();
        this.fetchers = fetchers;
    }
    fetchFromAllSources() {
        return __awaiter(this, void 0, void 0, function* () {
            const allSaved = [];
            for (const fetcher of this.fetchers) {
                const fetcherName = fetcher.constructor.name;
                try {
                    const articles = yield fetcher.fetchNews();
                    const validArticles = this.filterDuplicates(articles);
                    const saved = yield this.saveArticles(validArticles);
                    allSaved.push(...saved);
                    this.logger.info(`[NewsService] ${fetcherName} fetched ${saved.length} new articles`);
                }
                catch (error) {
                    this.logger.error(`[NewsService] Error from ${fetcherName}`, {
                        message: error.message,
                        stack: error.stack,
                    });
                }
            }
            return allSaved;
        });
    }
    filterDuplicates(articles) {
        return articles.filter(article => !!article.title && !!article.url);
    }
    saveArticles(articles) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield repositories_1.NewsArticleRepository.findByUrls(articles.map(a => a.url));
            const existingUrls = new Set(existing.map(a => a.url));
            const newArticles = articles.filter(a => !existingUrls.has(a.url));
            const savedEntities = yield repositories_1.NewsArticleRepository.saveAll(newArticles);
            return savedEntities;
        });
    }
}
exports.NewsService = NewsService;
