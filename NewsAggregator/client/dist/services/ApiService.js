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
    static async getArticlesByDateRange(start, end) {
        const res = await httpClient_1.httpClient.get(`/articles/date?start=${start}&end=${end}`);
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
    static async addCategory(name) {
        await httpClient_1.httpClient.post('/news-categories', { name });
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
        await httpClient_1.httpClient.delete(`/external-servers/${id}`);
    }
    static async getServerById(id) {
        const res = await httpClient_1.httpClient.get(`/admin/external-servers/${id}`);
        return res.data;
    }
}
exports.ApiService = ApiService;
