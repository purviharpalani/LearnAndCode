"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logger_1 = require("../infrastructure/logger/Logger");
const logger = Logger_1.Logger.getInstance();
// Middleware 1: Authenticate via Bearer Token
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        res.status(401).json({ error: 'Unauthorized: No token' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        logger.error('[Auth Middleware] Invalid token', err);
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
// ✅ Middleware 2: Role-based authorization
const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        res.status(403).json({ error: 'Forbidden: Admins only' });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
