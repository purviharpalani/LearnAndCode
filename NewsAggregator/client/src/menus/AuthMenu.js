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
exports.showAuthMenu = showAuthMenu;
const readline_sync_1 = __importDefault(require("readline-sync"));
const signup_1 = require("../protocol/signup");
const login_1 = require("../protocol/login");
const sessionManager_1 = require("../utils/sessionManager");
const UserMenu_1 = require("./UserMenu");
function showAuthMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            console.log('\n=== News Aggregator ===');
            console.log('1. Sign Up');
            console.log('2. Login');
            console.log('3. Exit');
            const choice = readline_sync_1.default.question('Choose an option: ');
            if (choice === '1') {
                yield (0, signup_1.signupUser)();
            }
            else if (choice === '2') {
                yield (0, login_1.loginUser)();
                if (sessionManager_1.sessionManager.getSession()) {
                    yield (0, UserMenu_1.showUserMenu)();
                }
            }
            else if (choice === '3') {
                console.log('Goodbye!');
                process.exit(0);
            }
            else {
                console.log('Invalid choice.');
            }
        }
    });
}
