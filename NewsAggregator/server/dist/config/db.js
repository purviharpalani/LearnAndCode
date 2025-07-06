"use strict";
// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { User, UserSession, Notification, ExternalServer, NotificationPreference, EmailLog, ApiRequestLog, SearchHistory, SavedArticle, NewsArticle, ArticleReaction } from '../entities';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.AppDataSource = void 0;
// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || 'Purvi@123',
//   database: process.env.DB_NAME || 'news_schema',
//   entities: [User,
//       UserSession,
//       NewsArticle,
//       ArticleReaction,
//       Notification,
//       SavedArticle,
//       SearchHistory,
//       ExternalServer,
//       EmailLog,
//       ApiRequestLog],
//   synchronize: true, 
//   logging: false,
// });
// export const connectToDatabase = async () => {
//   try {
//     await AppDataSource.initialize();
//     console.log('[DB] Connected to database');
//   } catch (err) {
//     console.error('[DB] Error connecting to database:', err);
//     process.exit(1);
//   }
// };
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Logger_1 = require("../infrastructure/logger/Logger");
const entities = __importStar(require("../entities"));
// import { NewsCategory } from '../entities/NewsCategory';
const logger = Logger_1.Logger.getInstance();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Purvi@123',
    database: process.env.DB_NAME || 'news_aggregation',
    entities: [entities.User,
        entities.UserSession,
        entities.NewsArticle,
        entities.ArticleReaction,
        entities.NewsCategory,
        entities.Notification,
        entities.SavedArticle,
        entities.SearchHistory,
        entities.NotificationPreference,
        entities.ExternalServer,
        entities.EmailLog,
        entities.ApiRequestLog],
    synchronize: true, // ⚠️ Disable in production
    logging: false,
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('DB Config:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            name: process.env.DB_NAME,
        });
        yield exports.AppDataSource.initialize();
        logger.info('[DB] Connection established successfully');
    }
    catch (err) {
        logger.error('[DB] Failed to connect to database', err);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
