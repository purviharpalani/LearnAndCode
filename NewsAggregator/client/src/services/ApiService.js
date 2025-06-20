"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
// client/services/ApiService.ts
const axios_1 = __importDefault(require("axios"));
const sessionStore_1 = require("../session/sessionStore");
const API_BASE = 'http://localhost:3000';
exports.api = axios_1.default.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' }
});
exports.api.interceptors.request.use(config => {
    if (sessionStore_1.sessionToken) {
        config.headers['Authorization'] = `Session ${sessionStore_1.sessionToken}`;
    }
    return config;
});
