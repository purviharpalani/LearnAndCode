"use strict";
// // // src/controllers/auth.controller.ts
// // import { Request, Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import { v4 as uuidv4 } from 'uuid';
// // import { AppDataSource } from '../data-source';
// // import { User } from '../entities/User';
// // import { UserSession } from '../entities/UserSession';
// // import { UserRepository } from '../repositories/UserRepository';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
const UserSession_1 = require("../entities/UserSession");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email, username, password, role } = req.body;
            try {
                console.log('Signup request:', { email, username, role });
                // Validate required fields
                if (!email || !username || !password) {
                    res.status(400).json({ error: 'Email, username, and password are required' });
                    return;
                }
                // Get User repository directly from AppDataSource
                const userRepo = db_1.AppDataSource.getRepository(User_1.User);
                console.log('User repository obtained successfully');
                // Check if user already exists
                console.log('Checking if user exists...');
                const existingUser = yield userRepo.findOne({
                    where: [{ email }, { username }]
                });
                if (existingUser) {
                    res.status(400).json({ error: 'User already exists' });
                    return;
                }
                console.log('User does not exist, proceeding with creation...');
                // Hash password
                const password_hash = yield bcryptjs_1.default.hash(password, 10);
                console.log('Password hashed successfully');
                // Create user directly with repository
                const newUser = userRepo.create({
                    email,
                    username,
                    password_hash,
                    role: role || 'user',
                    is_active: true
                });
                console.log('User entity created, saving...');
                const savedUser = yield userRepo.save(newUser);
                console.log('User saved successfully:', savedUser.id);
                res.status(201).json({
                    message: 'User created successfully',
                    userId: savedUser.id
                });
            }
            catch (err) {
                console.error('[SIGNUP ERROR]', err);
                console.error('Error name:', (_a = err === null || err === void 0 ? void 0 : err.constructor) === null || _a === void 0 ? void 0 : _a.name);
                console.error('Error message:', err === null || err === void 0 ? void 0 : err.message);
                console.error('Error stack:', err === null || err === void 0 ? void 0 : err.stack);
                res.status(500).json({
                    error: 'Internal server error',
                    details: err instanceof Error ? err.message : 'Unknown error'
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                if (!email || !password) {
                    res.status(400).json({ error: 'Email and password are required' });
                    return;
                }
                // Get User repository directly
                const userRepo = db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { email } });
                if (!user || !user.is_active) {
                    res.status(401).json({ error: 'Invalid credentials' });
                    return;
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password_hash);
                if (!isMatch) {
                    res.status(401).json({ error: 'Invalid credentials' });
                    return;
                }
                const sessionToken = (0, uuid_1.v4)();
                const sessionRepo = db_1.AppDataSource.getRepository(UserSession_1.UserSession);
                const session = sessionRepo.create({ session_token: sessionToken, user, expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000), is_active: true });
                yield sessionRepo.save(session);
                res.json({
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    sessionToken,
                });
            }
            catch (err) {
                console.error('[LOGIN ERROR]', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
