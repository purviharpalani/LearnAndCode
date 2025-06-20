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
exports.requireSession = requireSession;
const UserSessionRepository_1 = require("../repositories/UserSessionRepository");
function requireSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Session ')) {
            return res.status(401).json({ error: 'Missing or invalid session token' });
        }
        const token = authHeader.replace('Session ', '').trim();
        try {
            const session = yield UserSessionRepository_1.SessionRepository.findByToken(token);
            if (!session || !session.is_active || new Date(session.expires_at) < new Date()) {
                return res.status(401).json({ error: 'Invalid or expired session' });
            }
            req.user = session.user;
            next();
        }
        catch (err) {
            console.error('[SESSION ERROR]', err);
            res.status(500).json({ error: 'Session validation failed' });
        }
    });
}
