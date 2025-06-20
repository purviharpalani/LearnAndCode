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
exports.signupUser = signupUser;
const readline_sync_1 = __importDefault(require("readline-sync"));
const httpClient_1 = require("../utils/httpClient");
function signupUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n=== Sign Up ===');
        const username = readline_sync_1.default.question('Username: ');
        const email = readline_sync_1.default.questionEMail('Email: ');
        const password = readline_sync_1.default.question('Password: ', { hideEchoBack: true });
        const role = readline_sync_1.default.question('Role (user/admin): ');
        try {
            const response = yield httpClient_1.httpClient.post('/auth/signup', {
                username,
                email,
                password,
                role
            });
            console.log('Signup Success:', response.data);
        }
        catch (err) {
            if (err.response) {
                console.error('Signup Failed:', err.response.data.error);
            }
            else {
                console.error('Network/Error:', err.message);
            }
        }
    });
}
