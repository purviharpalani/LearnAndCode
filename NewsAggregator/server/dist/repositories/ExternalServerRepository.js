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
exports.ExternalServerRepository = void 0;
const db_1 = require("../config/db");
const ExternalServer_1 = require("../entities/ExternalServer");
class ExternalServerRepository {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find();
        });
    }
    static getStatusSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({
                select: ['id', 'name', 'is_active', 'last_accessed'],
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update(id, data);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.delete(id);
        });
    }
}
exports.ExternalServerRepository = ExternalServerRepository;
ExternalServerRepository.repo = db_1.AppDataSource.getRepository(ExternalServer_1.ExternalServer);
