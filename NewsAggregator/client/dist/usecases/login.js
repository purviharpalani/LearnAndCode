"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const sessionManager_1 = require("../session/sessionManager");
async function loginUser() {
    const email = readline_sync_1.default.questionEMail('Email: ');
    const password = readline_sync_1.default.question('Password: ', { hideEchoBack: true });
    try {
        const user = await ApiService_1.ApiService.login({ email, password });
        sessionManager_1.sessionManager.setSession(user);
        console.log(`\nWelcome, ${user.username}!`);
    }
    catch (err) {
        console.error('Login failed:', err.message);
    }
}
