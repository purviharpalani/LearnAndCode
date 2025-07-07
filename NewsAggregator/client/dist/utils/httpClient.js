"use strict";
// src/utils/httpClient.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const sessionManager_1 = require("../session/sessionManager");
const config_1 = require("../config");
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
exports.httpClient = axios_1.default.create({
    baseURL: config_1.config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
exports.httpClient.interceptors.request.use((config) => {
    const token = sessionManager_1.sessionManager.getToken();
    if (token) {
        config.headers['Authorization'] = `Session ${token}`;
    }
    return config;
});
