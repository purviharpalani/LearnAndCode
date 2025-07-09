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
exports.NewsFetchJobService = void 0;
const NewsService_1 = require("../../modules/news/services/NewsService");
const TheNewsApiFetcher_1 = require("../../infrastructure/fetchers/TheNewsApiFetcher");
const NewsApiOrgFetcher_1 = require("../../infrastructure/fetchers/NewsApiOrgFetcher");
class NewsFetchJobService {
    constructor() {
        const fetchers = [new NewsApiOrgFetcher_1.NewsApiOrgFetcher(), new TheNewsApiFetcher_1.TheNewsApiFetcher()];
        this.service = new NewsService_1.NewsService(fetchers);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.fetchFromAllSources();
        });
    }
}
exports.NewsFetchJobService = NewsFetchJobService;
