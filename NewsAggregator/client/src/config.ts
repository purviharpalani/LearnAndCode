// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:3000',
  logLevel: process.env.LOG_LEVEL ?? 'info',
};
