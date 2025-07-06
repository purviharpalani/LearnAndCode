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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const validator_1 = require("../../../shared/utils/validator");
const CustomError_1 = require("../../../core/errors/CustomError");
const Logger_1 = require("../../../infrastructure/logger/Logger");
const repositories_1 = require("../../../repositories");
class AuthService {
    constructor() {
        this.logger = Logger_1.Logger.getInstance();
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, role } = data;
            if (!email || !username || !password) {
                throw new CustomError_1.CustomError('Email, username, and password are required', 400);
            }
            if (!(0, validator_1.isValidEmail)(email)) {
                throw new CustomError_1.CustomError('Invalid email format', 400);
            }
            const exists = yield repositories_1.UserRepository.existsByEmailOrUsername(email, username);
            if (exists) {
                throw new CustomError_1.CustomError('User already exists', 400);
            }
            const password_hash = yield bcryptjs_1.default.hash(password, 10);
            const newUser = {
                email,
                username,
                password_hash,
                role: role || 'user',
                is_active: true,
            };
            const saved = yield repositories_1.UserRepository.save(newUser);
            this.logger.info(`User created successfully: ${saved.id}`);
            return { userId: saved.id };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            if (!email || !password) {
                throw new CustomError_1.CustomError('Email and password are required', 400);
            }
            const user = yield repositories_1.UserRepository.findOneBy({ email });
            if (!user || !user.is_active) {
                throw new CustomError_1.CustomError('Invalid credentials', 401);
            }
            const match = yield bcryptjs_1.default.compare(password, user.password_hash);
            if (!match) {
                throw new CustomError_1.CustomError('Invalid credentials', 401);
            }
            const sessionToken = (0, uuid_1.v4)();
            const session = {
                session_token: sessionToken,
                user,
                is_active: true,
                expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
            };
            yield repositories_1.UserSessionRepository.createAndSave(session);
            return {
                userId: user.id,
                username: user.username,
                role: user.role,
                sessionToken,
            };
        });
    }
}
exports.AuthService = AuthService;
