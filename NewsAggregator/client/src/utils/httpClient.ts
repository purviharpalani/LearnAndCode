// src/utils/httpClient.ts

import axios from 'axios';
import { sessionManager } from '../session/sessionManager';
import { config } from '../config';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = sessionManager.getToken();
  if (token) {
    config.headers['Authorization'] = `Session ${token}`;
  }
  return config;
});
