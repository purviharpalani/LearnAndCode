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
exports.SavedArticleRepository = void 0;
const db_1 = require("../config/db");
const SavedArticle_1 = require("../entities/SavedArticle");
class SavedArticleRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(SavedArticle_1.SavedArticle);
    }
    static findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({
                where: { user: { id: userId } },
                relations: ['article'],
            });
        });
    }
    static findByUserAndArticle(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: { user: { id: userId }, article: { id: articleId } },
                relations: ['user', 'article'],
            });
        });
    }
    static save(user, article) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = this.repo.create({ user, article });
            return yield this.repo.save(entry);
        });
    }
}
exports.SavedArticleRepository = SavedArticleRepository;
