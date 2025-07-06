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
exports.NotificationJobService = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const NotificationRepository_1 = require("../../repositories/NotificationRepository");
const UserRepository_1 = require("../../repositories/UserRepository");
const MailService_1 = require("../../infrastructure/mail/MailService");
const NewsFetchJobService_1 = require("./NewsFetchJobService");
class NotificationJobService {
    constructor() {
        this.logger = Logger_1.Logger.getInstance();
        this.fetchJob = new NewsFetchJobService_1.NewsFetchJobService();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const newArticles = yield this.fetchJob.run(); // ✅ Only newly fetched
            if (!newArticles.length) {
                this.logger.info('[NotificationJob] No new articles to notify.');
                return;
            }
            const users = yield UserRepository_1.UserRepository.findAllWithPreferences();
            for (const user of users) {
                const prefs = user.notificationPreferences || [];
                if (prefs.length === 0)
                    continue;
                const categories = prefs
                    .filter(p => p.category && p.enabled)
                    .map(p => p.category);
                const keywordPref = prefs.find(p => !p.category && p.enabled);
                let keywords = [];
                if (Array.isArray(keywordPref === null || keywordPref === void 0 ? void 0 : keywordPref.keywords)) {
                    keywords = keywordPref.keywords;
                }
                else if (typeof (keywordPref === null || keywordPref === void 0 ? void 0 : keywordPref.keywords) === 'string') {
                    keywords = keywordPref.keywords.split(',').map(k => k.trim());
                }
                const matches = newArticles.filter((article) => categories.includes(article.category) ||
                    keywords.some(k => {
                        var _a, _b;
                        return ((_a = article.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(k.toLowerCase())) ||
                            ((_b = article.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(k.toLowerCase()));
                    }));
                if (matches.length === 0)
                    continue;
                const notifications = [];
                const htmlParts = [];
                for (const article of matches) {
                    const alreadySent = yield NotificationRepository_1.NotificationRepository.findByUserAndArticle(user.id, article.id);
                    if (alreadySent)
                        continue;
                    notifications.push(NotificationRepository_1.NotificationRepository.create({
                        user,
                        user_id: user.id,
                        title: article.title,
                        message: article.description || '',
                        related_article_id: article.id,
                        created_at: new Date(),
                    }));
                    htmlParts.push(`
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}">Read more</a>
          <hr />
        `);
                }
                if (notifications.length > 0) {
                    yield NotificationRepository_1.NotificationRepository.saveAll(notifications);
                    yield MailService_1.MailService.send(user.email, `📰 Your News Digest (${notifications.length} articles)`, `<div><p>Here’s what’s new based on your preferences:</p>${htmlParts.join('\n')}</div>`);
                    this.logger.info(`[NotificationJob] Sent ${notifications.length} articles to ${user.email}`);
                }
            }
        });
    }
}
exports.NotificationJobService = NotificationJobService;
