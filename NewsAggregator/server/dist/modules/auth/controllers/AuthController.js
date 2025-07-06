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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const Logger_1 = require("../../../infrastructure/logger/Logger");
const CustomError_1 = require("../../../core/errors/CustomError");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthController.service.signup(req.body);
                res.status(201).json(Object.assign({ message: 'User created successfully' }, result));
            }
            catch (err) {
                AuthController.logger.error('[SIGNUP ERROR] ' + err.message);
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                res.status(status).json({ error: errorMessage });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthController.service.login(req.body);
                res.status(200).json(result);
            }
            catch (err) {
                AuthController.logger.error('[LOGIN ERROR] ' + err.message);
                const status = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                res.status(status).json({ error: errorMessage });
            }
        });
    }
}
exports.AuthController = AuthController;
AuthController.service = new AuthService_1.AuthService();
AuthController.logger = Logger_1.Logger.getInstance();
