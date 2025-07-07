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
exports.NewsCategoryController = void 0;
const NewsCategoryRepository_1 = require("../repositories/NewsCategoryRepository");
class NewsCategoryController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const category = yield NewsCategoryRepository_1.NewsCategoryRepository.add(name);
            return res.status(201).json(category);
        });
    }
    static toggleVisibility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { hide } = req.body;
            if (isNaN(id))
                return res.status(400).json({ error: 'Invalid category ID' });
            try {
                yield NewsCategoryRepository_1.NewsCategoryRepository.toggleVisibility(id, hide);
                res.json({ message: `Category ${hide ? 'hidden' : 'unhidden'} successfully.` });
            }
            catch (err) {
                res.status(500).json({ error: 'Failed to toggle category visibility' });
            }
        });
    }
    static getHiddenCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hidden = yield NewsCategoryRepository_1.NewsCategoryRepository.findHidden();
                res.json(hidden);
            }
            catch (err) {
                res.status(500).json({ error: 'Failed to fetch hidden categories' });
            }
        });
    }
}
exports.NewsCategoryController = NewsCategoryController;
