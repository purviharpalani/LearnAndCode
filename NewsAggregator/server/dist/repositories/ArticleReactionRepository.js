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
exports.ArticleReactionRepository = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
class ArticleReactionRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(entities_1.ArticleReaction);
    }
    static findByUserAndArticle(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { user: { id: userId }, article: { id: articleId } },
            });
        });
    }
    static save(reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repo.create(reaction);
            return yield this.repo.save(entity);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.delete(id);
        });
    }
    static react(user, article, isLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.repo.findOne({ where: { user: { id: user.id }, article: { id: article.id } } });
            if (existing) {
                throw new Error('You have already reacted to this article.');
            }
            const reaction = this.repo.create({
                user: { id: user.id },
                article: { id: article.id },
                type: isLike ? 'like' : 'dislike'
            });
            yield this.repo.save(reaction);
            const articleRepo = db_1.AppDataSource.getRepository(entities_1.NewsArticle);
            if (isLike) {
                yield articleRepo.increment({ id: article.id }, 'likes', 1);
            }
            else {
                yield articleRepo.increment({ id: article.id }, 'dislikes', 1);
            }
        });
    }
}
exports.ArticleReactionRepository = ArticleReactionRepository;
