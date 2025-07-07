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
const db_1 = require("../../config/db");
const NewsCategoryRepository_1 = require("../../repositories/NewsCategoryRepository");
const NewsCategory_1 = require("../../entities/NewsCategory");
describe('NewsCategoryRepository', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.AppDataSource.initialize();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.AppDataSource.destroy();
    }));
    it('should toggle visibility of category', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield db_1.AppDataSource.getRepository(NewsCategory_1.NewsCategory).save({ name: 'TestCat' });
        yield NewsCategoryRepository_1.NewsCategoryRepository.toggleVisibility(category.id, true);
        const updated = yield db_1.AppDataSource.getRepository(NewsCategory_1.NewsCategory).findOneBy({ id: category.id });
        expect(updated === null || updated === void 0 ? void 0 : updated.is_hidden).toBe(true);
    }));
    it('should find hidden categories', () => __awaiter(void 0, void 0, void 0, function* () {
        const hidden = yield NewsCategoryRepository_1.NewsCategoryRepository.findHidden();
        expect(hidden.some(cat => cat.is_hidden)).toBe(true);
    }));
});
