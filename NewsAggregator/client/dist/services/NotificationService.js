"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
// client/services/NotificationService.ts
const httpClient_1 = require("../utils/httpClient");
class NotificationService {
    static async fetchNotifications(userId) {
        const res = await httpClient_1.httpClient.get(`/notifications/${userId}`);
        return res.data;
    }
    static async getPreferences(userId) {
        const res = await httpClient_1.httpClient.get(`/notifications/preferences/${userId}`);
        return res.data;
    }
    static async toggleCategory(userId, categoryIndex) {
        const categoryMap = {
            1: 'business',
            2: 'entertainment',
            3: 'sports',
            4: 'technology',
        };
        const category = categoryMap[categoryIndex];
        if (!category)
            throw new Error('Invalid category index');
        await httpClient_1.httpClient.patch(`/notifications/preferences/${userId}/toggle`, { category });
    }
    static async setKeywords(userId, keywords) {
        await httpClient_1.httpClient.patch(`/notifications/preferences/${userId}/keywords`, { keywords });
    }
}
exports.NotificationService = NotificationService;
