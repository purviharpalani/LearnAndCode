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
exports.loginUser = loginUser;
const readline_sync_1 = __importDefault(require("readline-sync"));
const httpClient_1 = require("../utils/httpClient");
const sessionManager_1 = require("../utils/sessionManager");
function loginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const email = readline_sync_1.default.questionEMail('Email: ');
        const password = readline_sync_1.default.question('Password: ', { hideEchoBack: true });
        try {
            const res = yield httpClient_1.httpClient.post('/auth/login', { email, password });
            sessionManager_1.sessionManager.setSession(res.data);
            console.log(`Logged in as ${res.data.username}`);
        }
        catch (err) {
            console.error('Login Failed:', ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err.message);
        }
    });
}
