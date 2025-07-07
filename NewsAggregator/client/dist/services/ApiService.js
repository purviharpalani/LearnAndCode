"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
// client/services/ApiService.ts
const httpClient_1 = require("../utils/httpClient");
class ApiService {
    static async login(data) {
        const res = await httpClient_1.httpClient.post('/auth/login', data);
        return res.data;
    }
    static async signup(data) {
        const res = await httpClient_1.httpClient.post('/auth/signup', data);
        return res.data;
    }
    static async getAllArticles() {
        const res = await httpClient_1.httpClient.get('/articles');
        return res.data;
    }
    static async getSavedArticles() {
        const res = await httpClient_1.httpClient.get('/articles/saved');
        return res.data;
    }
    static async getTodaysHeadlines() {
        const res = await httpClient_1.httpClient.get('/articles/headlines/today');
        return res.data;
    }
    static async getArticlesByDateRange(startDate, endDate) {
        const res = await httpClient_1.httpClient.get('/articles/headlines', {
            params: { startDate, endDate },
            withCredentials: true,
        });
        return res.data;
    }
    static async searchArticles(query, sortBy) {
        const res = await httpClient_1.httpClient.get(`/articles/search`, {
            params: { query, sortBy },
        });
        return res.data;
    }
    static async saveArticle(articleId) {
        await httpClient_1.httpClient.post('/articles/save', { articleId });
    }
    static async checkIfArticleSaved(articleId) {
        const res = await httpClient_1.httpClient.get(`/articles/check-saved?articleId=${articleId}`);
        return res.data;
    }
    static async addNewsCategory(name) {
        const res = await httpClient_1.httpClient.post('/admin/news-categories', { name });
        return res.data;
    }
    static async getExternalServerStatus() {
        const res = await httpClient_1.httpClient.get('/admin/external-servers/status');
        return res.data;
    }
    static async getAllExternalServers() {
        const res = await httpClient_1.httpClient.get('/external-servers');
        return res.data;
    }
    static async updateExternalServer(id, update) {
        const res = await httpClient_1.httpClient.put(`/admin/external-servers/${id}`, update);
        return res.data;
    }
    static async deleteExternalServer(id) {
        await httpClient_1.httpClient.delete(`/admin/external-servers/${id}`);
    }
    static async getServerById(id) {
        const res = await httpClient_1.httpClient.get(`/admin/external-servers/${id}`);
        return res.data;
    }
    static async reportArticle(articleId, reason) {
        return httpClient_1.httpClient.post(`/articles/report`, { articleId, reason }, { withCredentials: true });
    }
    static async getReportedArticles() {
        return httpClient_1.httpClient.get('/admin/reports').then(res => res.data);
    }
    static async hideArticle(articleId) {
        return httpClient_1.httpClient.post(`/admin/articles/${articleId}/hide`);
    }
    static async toggleCategoryVisibility(id, hide) {
        return httpClient_1.httpClient.post(`/admin/news-categories/${id}/toggle`, { hide });
    }
    static async getHiddenCategories() {
        const res = await httpClient_1.httpClient.get('/admin/news-categories/hidden');
        return res.data;
    }
}
exports.ApiService = ApiService;
