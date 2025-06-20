"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const sessionManager_1 = require("./sessionManager");
exports.httpClient = axios_1.default.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});
exports.httpClient.interceptors.request.use(config => {
    const session = sessionManager_1.sessionManager.getSession();
    if (session) {
        config.headers['Authorization'] = `Session ${session.sessionToken}`;
    }
    return config;
});
