// client/services/ApiService.ts
import axios from 'axios';
import { sessionToken } from '../session/sessionStore';

const API_BASE = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  if (sessionToken) {
    config.headers['Authorization'] = `Session ${sessionToken}`;
  }
  return config;
});
