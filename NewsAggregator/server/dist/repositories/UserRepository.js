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
    static getRepo() {
        return db_1.AppDataSource.getRepository(User_1.User);
    }
    static create(data) {
        return this.getRepo().create(data);
    }
    static save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.getRepo().create(user);
            return yield this.getRepo().save(newUser);
        });
    }
    static findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getRepo().findOne({ where: condition });
        });
    }
    static exists(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.getRepo().findOne({
                where: [{ email }, { username }],
            });
            return !!existing;
        });
    }
}
exports.UserRepository = UserRepository;
