"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const UserSession_1 = require("./entities/UserSession");
const NewsCategory_1 = require("./entities/NewsCategory");
const Notification_1 = require("./entities/Notification");
const NotificationConfig_1 = require("./entities/NotificationConfig");
const ExternalServer_1 = require("./entities/ExternalServer");
const EmailLog_1 = require("./entities/EmailLog");
const ApiRequestLog_1 = require("./entities/ApiRequestLog");
const SearchHistory_1 = require("./entities/SearchHistory");
const NewsArticle_1 = require("./entities/NewsArticle");
const SavedArticle_1 = require("./entities/SavedArticle");
// import other entities as needed
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Puru@192416*', // update this
    database: 'news_schema',
    synchronize: true,
    logging: true,
    //   entities: [__dirname + '/entities/*.ts'],
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
});
