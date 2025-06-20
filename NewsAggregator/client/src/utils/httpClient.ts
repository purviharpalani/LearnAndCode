import axios from 'axios';
import { sessionManager } from './sessionManager';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

httpClient.interceptors.request.use(config => {
  const session = sessionManager.getSession();
  if (session) {
    config.headers['Authorization'] = `Session ${session.sessionToken}`;
  }
  return config;
});
