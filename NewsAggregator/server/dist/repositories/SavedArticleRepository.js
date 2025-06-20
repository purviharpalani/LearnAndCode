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
exports.SavedArticleRepository = {
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.AppDataSource.getRepository(SavedArticle_1.SavedArticle).find({
                where: { user: { id: userId } },
                relations: ['article'],
            });
        });
    },
    findByUserAndArticle(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.AppDataSource.getRepository(SavedArticle_1.SavedArticle).findOne({
                where: { user: { id: userId }, article: { id: articleId } },
                relations: ['user', 'article'],
            });
        });
    },
    save(user, article) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = db_1.AppDataSource.getRepository(SavedArticle_1.SavedArticle);
            const entry = repo.create({ user, article });
            yield repo.save(entry);
        });
    }
};
