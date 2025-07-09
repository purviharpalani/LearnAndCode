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
exports.UserRepository = void 0;
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
class UserRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(User_1.User);
    }
    static create(userData) {
        return this.repo.create(userData);
    }
    static save(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repo.create(userData);
            return yield this.repo.save(user);
        });
    }
    static findOneBy(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({ where: condition });
        });
    }
    static existsByEmailOrUsername(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.repo.findOne({
                where: [{ email }, { username }],
            });
            return !!existing;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({ where: { id } });
        });
    }
    static findAllWithPreferences() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({
                where: { is_active: true },
                relations: ['notificationPreferences'],
            });
        });
    }
}
exports.UserRepository = UserRepository;
