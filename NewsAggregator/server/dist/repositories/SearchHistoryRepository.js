"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryRepository = void 0;
const db_1 = require("../config/db");
const SearchHistory_1 = require("../entities/SearchHistory");
exports.SearchHistoryRepository = db_1.AppDataSource.getRepository(SearchHistory_1.SearchHistory);
