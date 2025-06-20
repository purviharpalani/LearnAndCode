"use strict";
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const UserSession_1 = require("../entities/UserSession");
const NewsCategory_1 = require("../entities/NewsCategory");
const Notification_1 = require("../entities/Notification");
const NotificationConfig_1 = require("../entities/NotificationConfig");
const ExternalServer_1 = require("../entities/ExternalServer");
const EmailLog_1 = require("../entities/EmailLog");
const ApiRequestLog_1 = require("../entities/ApiRequestLog");
const SearchHistory_1 = require("../entities/SearchHistory");
const SavedArticle_1 = require("../entities/SavedArticle");
const NewsArticle_1 = require("../entities/NewsArticle");
// import all your entities here
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Purvi@123',
    database: process.env.DB_NAME || 'news_schema',
    entities: [User_1.User,
        UserSession_1.UserSession,
        NewsArticle_1.NewsArticle,
        NewsCategory_1.NewsCategory,
        Notification_1.Notification,
        SavedArticle_1.SavedArticle,
        SearchHistory_1.SearchHistory,
        NotificationConfig_1.NotificationConfig,
        ExternalServer_1.ExternalServer,
        EmailLog_1.EmailLog,
        ApiRequestLog_1.ApiRequestLog],
    synchronize: true,
    logging: true,
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.AppDataSource.initialize();
        console.log('[DB] Connected to database');
    }
    catch (err) {
        console.error('[DB] Error connecting to database:', err);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
