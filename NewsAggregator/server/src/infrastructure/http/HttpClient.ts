import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL?: string, headers: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Extendable for post/put/delete in future
}
