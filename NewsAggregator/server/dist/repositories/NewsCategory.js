"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsCategoryRepository = void 0;
const db_1 = require("../config/db");
const NewsCategory_1 = require("../entities/NewsCategory");
exports.NewsCategoryRepository = db_1.AppDataSource.getRepository(NewsCategory_1.NewsCategory);
