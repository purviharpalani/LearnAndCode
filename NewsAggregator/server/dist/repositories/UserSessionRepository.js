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
exports.UserSessionRepository = void 0;
const db_1 = require("../config/db");
const UserSession_1 = require("../entities/UserSession");
class UserSessionRepository {
    static get repo() {
        return db_1.AppDataSource.getRepository(UserSession_1.UserSession);
    }
    static findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { session_token: token },
                relations: ['user'],
            });
        });
    }
    static createAndSave(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = this.repo.create(session);
            return yield this.repo.save(newSession);
        });
    }
    static invalidateAllForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update({ user_id: userId }, { is_active: false });
        });
    }
}
exports.UserSessionRepository = UserSessionRepository;
