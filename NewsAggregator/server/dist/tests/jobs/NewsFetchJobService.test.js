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
// @ts-nocheck
require("jest");
const NewsFetchJobService_1 = require("../../jobs/services/NewsFetchJobService");
const NewsService_1 = require("../../modules/news/services/NewsService");
jest.mock('../../src/modules/news/services/NewsService');
describe('NewsFetchJobService', () => {
    it('should call fetchFromAllSources()', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFetch = jest.fn();
        NewsService_1.NewsService.mockImplementation(() => ({
            fetchFromAllSources: mockFetch
        }));
        const jobService = new NewsFetchJobService_1.NewsFetchJobService();
        yield jobService.run();
        expect(mockFetch).toHaveBeenCalled();
    }));
});
