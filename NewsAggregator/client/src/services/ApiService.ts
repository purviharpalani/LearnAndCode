// client/services/ApiService.ts
import { httpClient } from '../utils/httpClient';
import {
  LoginDTO,
  SignupDTO,
  NewsArticle,
  UserResponse,
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

  static async getArticlesByDateRange(start: string, end: string): Promise<NewsArticle[]> {
    const res = await httpClient.get(`/articles/date?start=${start}&end=${end}`);
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

  static async addCategory(name: string): Promise<void> {
  await httpClient.post('/news-categories', { name });
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
  await httpClient.delete(`/external-servers/${id}`);
}

static async getServerById(id: number) {
    const res = await httpClient.get(`/admin/external-servers/${id}`);
    return res.data;
  }


}
