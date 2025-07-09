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
exports.BlockedKeywordController = void 0;
const BlockedKeywordRepository_1 = require("../../../repositories/BlockedKeywordRepository");
class BlockedKeywordController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keywords = yield BlockedKeywordRepository_1.BlockedKeywordRepository.getAll();
            res.json(keywords);
        });
    }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keyword } = req.body;
            if (!keyword || typeof keyword !== 'string') {
                return res.status(400).json({ error: 'Invalid keyword' });
            }
            const result = yield BlockedKeywordRepository_1.BlockedKeywordRepository.add(keyword);
            res.status(201).json(result);
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id))
                return res.status(400).json({ error: 'Invalid ID' });
            yield BlockedKeywordRepository_1.BlockedKeywordRepository.remove(id);
            res.json({ message: 'Keyword removed successfully' });
        });
    }
}
exports.BlockedKeywordController = BlockedKeywordController;
