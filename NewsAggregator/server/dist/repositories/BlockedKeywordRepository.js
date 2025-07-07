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
exports.BlockedKeywordRepository = void 0;
// src/repositories/BlockedKeywordRepository.ts
const db_1 = require("../config/db");
const BlockedKeyword_1 = require("../entities/BlockedKeyword");
class BlockedKeywordRepository {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find();
        });
    }
    static add(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = this.repo.create({ keyword });
            return yield this.repo.save(entry);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.delete(id);
        });
    }
}
exports.BlockedKeywordRepository = BlockedKeywordRepository;
BlockedKeywordRepository.repo = db_1.AppDataSource.getRepository(BlockedKeyword_1.BlockedKeyword);
