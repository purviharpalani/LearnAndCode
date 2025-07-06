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
exports.NotificationRepository = void 0;
const db_1 = require("../config/db");
const Notification_1 = require("../entities/Notification");
class NotificationRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(Notification_1.Notification);
    }
    /**
     * Save a single notification
     */
    static create(data) {
        return this.repo.create(data);
    }
    static save(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = this.repo.create(notification);
            return yield this.repo.save(entry);
        });
    }
    /**
     * Save multiple notifications
     */
    static saveAll(notifications) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = this.repo.create(notifications);
            return yield this.repo.save(entries);
        });
    }
    /**
     * Find all notifications by a user
     */
    static findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({
                where: { user_id: userId },
                order: { created_at: 'DESC' },
            });
        });
    }
    /**
     * Check if notification was already sent for a given article to user
     */
    static findByUserAndArticle(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { user_id: userId, related_article_id: articleId },
            });
        });
    }
}
exports.NotificationRepository = NotificationRepository;
