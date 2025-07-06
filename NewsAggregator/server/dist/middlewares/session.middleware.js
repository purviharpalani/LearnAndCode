"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSession = void 0;
const UserSessionRepository_1 = require("../repositories/UserSessionRepository");
const Logger_1 = require("../infrastructure/logger/Logger");
const logger = Logger_1.Logger.getInstance();
const requireSession = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Session '))) {
        res.status(401).json({ error: 'Session token missing or invalid' });
        return;
    }
    const token = authHeader.replace('Session ', '').trim();
    UserSessionRepository_1.UserSessionRepository.findByToken(token)
        .then((session) => {
        if (!session || !session.is_active || new Date(session.expires_at) < new Date()) {
            res.status(401).json({ error: 'Session expired or invalid' });
            return;
        }
        req.user = session.user;
        next();
    })
        .catch((err) => {
        Logger_1.Logger.getInstance().error('[Session Middleware] Error', err);
        res.status(500).json({ error: 'Internal session error' });
    });
};
exports.requireSession = requireSession;
