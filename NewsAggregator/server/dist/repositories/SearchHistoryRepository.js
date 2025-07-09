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
exports.SearchHistoryRepository = void 0;
const db_1 = require("../config/db");
const SearchHistory_1 = require("../entities/SearchHistory");
class SearchHistoryRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(SearchHistory_1.SearchHistory);
    }
    static log(userId, query, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = this.repo.create({
                user_id: userId,
                search_query: query,
                results_count: results,
            });
            yield this.repo.save(entry);
        });
    }
}
exports.SearchHistoryRepository = SearchHistoryRepository;
