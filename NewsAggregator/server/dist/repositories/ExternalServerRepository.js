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
const entities_1 = require("../entities");
class ExternalServerRepository {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find();
        });
    }
    static createExternalServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.create(data);
        });
    }
    static getStatusSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({
                select: ['id', 'name', 'is_active', 'last_accessed'],
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOneBy({ id });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update({ id }, data);
        });
    }
    static updateApiKey(id, api_key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update({ id }, { api_key });
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.delete(id);
        });
    }
    static getStatusList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({
                select: ['id', 'name', 'is_active', 'last_accessed']
            });
        });
    }
    static updateStatus(serverId, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update({ id: serverId }, {
                is_active: isActive,
                last_accessed: new Date(),
            });
        });
    }
}
exports.ExternalServerRepository = ExternalServerRepository;
ExternalServerRepository.repo = db_1.AppDataSource.getRepository(entities_1.ExternalServer);
