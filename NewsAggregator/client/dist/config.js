"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// src/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:3000',
    logLevel: process.env.LOG_LEVEL ?? 'info',
};
