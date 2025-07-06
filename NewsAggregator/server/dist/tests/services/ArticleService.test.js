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
const ArticleService_1 = require("../../modules/articles/services/ArticleService");
const repositories_1 = require("../../repositories");
const CustomError_1 = require("../../core/errors/CustomError");
jest.mock('../../../src/repositories/NewsArticleRepository');
jest.mock('../../../src/repositories/SavedArticleRepository');
describe('ArticleService', () => {
    const service = new ArticleService_1.ArticleService();
    const mockUser = { id: 1 };
    const mockArticle = {
        id: 123,
        title: 'Sample',
        url: 'http://example.com',
        source: 'Test',
        category: 'tech',
        created_at: new Date(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should save article if not already saved', () => __awaiter(void 0, void 0, void 0, function* () {
        repositories_1.NewsArticleRepository.findById.mockResolvedValue(mockArticle);
        repositories_1.SavedArticleRepository.findByUserAndArticle.mockResolvedValue(null);
        repositories_1.SavedArticleRepository.save.mockResolvedValue({});
        yield service.saveArticle(mockUser, mockArticle.id);
        expect(repositories_1.SavedArticleRepository.save).toHaveBeenCalledWith(mockUser, mockArticle);
    }));
    it('should throw error if article already saved', () => __awaiter(void 0, void 0, void 0, function* () {
        repositories_1.NewsArticleRepository.findById.mockResolvedValue(mockArticle);
        repositories_1.SavedArticleRepository.findByUserAndArticle.mockResolvedValue({});
        yield expect(service.saveArticle(mockUser, mockArticle.id)).rejects.toThrow(CustomError_1.CustomError);
    }));
    it('should return saved articles', () => __awaiter(void 0, void 0, void 0, function* () {
        const savedArticles = [{ article: mockArticle }];
        repositories_1.SavedArticleRepository.findByUser.mockResolvedValue(savedArticles);
        const result = yield service.getSavedArticles(mockUser);
        expect(result).toEqual([mockArticle]);
    }));
    it('should return true if article is saved', () => __awaiter(void 0, void 0, void 0, function* () {
        repositories_1.SavedArticleRepository.findByUserAndArticle.mockResolvedValue({});
        const result = yield service.isArticleSaved(mockUser.id, mockArticle.id);
        expect(result).toBe(true);
    }));
    it('should return false if article is not saved', () => __awaiter(void 0, void 0, void 0, function* () {
        repositories_1.SavedArticleRepository.findByUserAndArticle.mockResolvedValue(null);
        const result = yield service.isArticleSaved(mockUser.id, mockArticle.id);
        expect(result).toBe(false);
    }));
});
