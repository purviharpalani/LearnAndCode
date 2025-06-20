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
exports.requireSession = void 0;
const db_1 = require("../config/db");
const UserSession_1 = require("../entities/UserSession");
const sessionRepo = db_1.AppDataSource.getRepository(UserSession_1.UserSession);
const requireSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Session ')) {
            res.status(401).json({ error: 'Session token missing' });
            return; // ✅ Exit early
        }
        const session_token = authHeader.replace('Session ', '').trim();
        const session = yield sessionRepo.findOne({
            where: { session_token },
            relations: ['user'],
        });
        if (!session || !session.user.is_active) {
            res.status(401).json({ error: 'Invalid or expired session' });
            return;
        }
        req.user = session.user;
        next();
    }
    catch (err) {
        console.error('[SESSION MIDDLEWARE ERROR]', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.requireSession = requireSession;
