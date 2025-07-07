"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = signupUser;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function signupUser() {
    const email = readline_sync_1.default.questionEMail('Email: ');
    if (!validator_1.Validator.isValidEmail(email)) {
        console.log('Invalid email format.');
        return;
    }
    const username = readline_sync_1.default.question('Username: ');
    const password = readline_sync_1.default.question('Password: ', { hideEchoBack: true });
    try {
        const res = await ApiService_1.ApiService.signup({ email, username, password });
        console.log('Account created! Your user ID is:', res.userId);
    }
    catch (err) {
        console.error('Signup failed:', err.message);
    }
}
