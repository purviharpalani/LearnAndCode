// client/services/ApiService.ts
import { httpClient } from '../utils/httpClient';
import {
  LoginDTO,
  SignupDTO,
  NewsArticle,
  UserResponse,
  ArticleReport
} from './types';

export class ApiService {
  static async login(data: LoginDTO): Promise<UserResponse> {
    const res = await httpClient.post('/auth/login', data);
    return res.data;
  }

  static async signup(data: SignupDTO): Promise<{ userId: number }> {
    const res = await httpClient.post('/auth/signup', data);
    return res.data;
  }

  static async getAllArticles(): Promise<NewsArticle[]> {
    const res = await httpClient.get('/articles');
    return res.data;
  }

  static async getSavedArticles(): Promise<NewsArticle[]> {
    const res = await httpClient.get('/articles/saved');
    return res.data;
  }

  static async getTodaysHeadlines(): Promise<NewsArticle[]> {
    const res = await httpClient.get('/articles/headlines/today');
    return res.data;
  }

  static async getArticlesByDateRange(startDate: string, endDate: string): Promise<NewsArticle[]> {
    const res = await httpClient.get('/articles/headlines', {
      params: { startDate, endDate },
      withCredentials: true,
    });
    return res.data;
  }

  static async searchArticles(query: string, sortBy?: string): Promise<NewsArticle[]> {
    const res = await httpClient.get(`/articles/search`, {
      params: { query, sortBy },
    });
    return res.data;
  }

  static async saveArticle(articleId: number): Promise<void> {
    await httpClient.post('/articles/save', { articleId });
  }

  static async checkIfArticleSaved(articleId: number): Promise<{ saved: boolean }> {
    const res = await httpClient.get(`/articles/check-saved?articleId=${articleId}`);
    return res.data;
  }

  static async addNewsCategory(name: string): Promise<any[]> {
    const res = await httpClient.post('/admin/news-categories', { name });
    return res.data;
  }

  static async getExternalServerStatus(): Promise<any[]> {
    const res = await httpClient.get('/admin/external-servers/status');
    return res.data;
  }

  static async getAllExternalServers(): Promise<any[]> {
    const res = await httpClient.get('/external-servers');
    return res.data;
  }

  static async updateExternalServer(id: number, update: { api_key: string }) {
    const res = await httpClient.put(`/admin/external-servers/${id}`, update);
    return res.data;
  }

  static async deleteExternalServer(id: number): Promise<void> {
    await httpClient.delete(`/admin/external-servers/${id}`);
  }

  static async getServerById(id: number) {
    const res = await httpClient.get(`/admin/external-servers/${id}`);
    return res.data;
  }

  static async reportArticle(articleId: number, reason: string) {
    return httpClient.post(`/articles/report`, { articleId, reason }, { withCredentials: true });
  }

  static async hideArticle(articleId: number) {
    return httpClient.post(`/admin/articles/${articleId}/hide`);
  }

  static async toggleCategoryVisibility(id: number, hide: boolean) {
    return httpClient.post(`/admin/news-categories/${id}/toggle`, { hide });
  }

  static async getHiddenCategories() {
    const res = await httpClient.get('/admin/news-categories/hidden');
    return res.data;
  }

  static async getReportedArticles(): Promise<ArticleReport[]> {
  const res = await httpClient.get('/admin/reports');
  return res.data;
}

}
