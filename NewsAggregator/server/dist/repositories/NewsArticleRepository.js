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
exports.NewsArticleRepository = void 0;
const db_1 = require("../config/db");
const NewsArticle_1 = require("../entities/NewsArticle");
const typeorm_1 = require("typeorm");
class NewsArticleRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(NewsArticle_1.NewsArticle);
    }
    static findByCreatedSince(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ where: { created_at: (0, typeorm_1.MoreThan)(date) } });
        });
    }
    static findByUrls(urls) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ where: urls.map(url => ({ url })) });
        });
    }
    static saveAll(articles) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = this.repo.create(articles);
            return yield this.repo.save(entries);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({ where: { id } });
        });
    }
    static getByDateRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.createQueryBuilder('article')
                .where('DATE(article.created_at) BETWEEN :start AND :end', { start, end })
                .orderBy('article.created_at', 'DESC')
                .getMany();
        });
    }
    static searchWithFilters(query_1, startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (query, startDate, endDate, sortBy = 'recent') {
            let qb = this.repo.createQueryBuilder('article')
                .where('LOWER(article.title) LIKE :query OR LOWER(article.description) LIKE :query', {
                query: `%${query.toLowerCase()}%`,
            });
            if (startDate && endDate) {
                qb = qb.andWhere('DATE(article.created_at) BETWEEN :start AND :end', {
                    start: startDate,
                    end: endDate,
                });
            }
            // Normalize sortBy = 'date' => 'recent'
            const safeSort = sortBy === 'date' ? 'recent' : sortBy;
            if (safeSort === 'likes') {
                qb = qb.orderBy('article.likes', 'DESC');
            }
            else if (safeSort === 'dislikes') {
                qb = qb.orderBy('article.dislikes', 'DESC');
            }
            else {
                qb = qb.orderBy('article.created_at', 'DESC');
            }
            return yield qb.getMany();
        });
    }
}
exports.NewsArticleRepository = NewsArticleRepository;
