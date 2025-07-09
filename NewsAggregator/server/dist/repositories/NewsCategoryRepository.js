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
exports.NewsCategoryRepository = void 0;
// src/repositories/NewsCategoryRepository.ts
const db_1 = require("../config/db");
const NewsCategory_1 = require("../entities/NewsCategory");
class NewsCategoryRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(NewsCategory_1.NewsCategory);
    }
    static add(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.repo.create({ name });
            return yield this.repo.save(category);
        });
    }
    static exists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.repo.findOneBy({ name });
            return !!found;
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({ where: { name } });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find();
        });
    }
    static update(id, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update({ id }, updateFields);
        });
    }
    static toggleVisibility(id, hide) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update(id, { is_hidden: hide });
        });
    }
    static getHidden() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ where: { is_hidden: true } });
        });
    }
    static getVisibleCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ where: { is_hidden: false } });
        });
    }
}
exports.NewsCategoryRepository = NewsCategoryRepository;
