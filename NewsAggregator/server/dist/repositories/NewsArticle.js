"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsArticleRepository = void 0;
const db_1 = require("../config/db");
const NewsArticle_1 = require("../entities/NewsArticle");
exports.NewsArticleRepository = db_1.AppDataSource.getRepository(NewsArticle_1.NewsArticle);
