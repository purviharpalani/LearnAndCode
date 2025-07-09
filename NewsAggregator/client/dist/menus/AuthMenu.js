"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMenu = void 0;
// src/menus/AuthMenu.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const signup_1 = require("../usecases/signup");
const login_1 = require("../usecases/login");
const sessionManager_1 = require("../session/sessionManager");
const UserMenu_1 = require("./UserMenu");
const AdminMenu_1 = require("./AdminMenu");
class AuthMenu {
    async run() {
        while (true) {
            console.log('\n=== News Aggregator ===');
            console.log('1. Sign Up');
            console.log('2. Login');
            console.log('3. Exit');
            const choice = readline_sync_1.default.question('Choose an option: ');
            switch (choice) {
                case '1':
                    await (0, signup_1.signupUser)();
                    break;
                case '2':
                    await (0, login_1.loginUser)();
                    const session = sessionManager_1.sessionManager.getSession();
                    if (session) {
                        if (session.role === 'admin') {
                            await (0, AdminMenu_1.showAdminMenu)();
                        }
                        else {
                            await new UserMenu_1.UserMenu().run();
                        }
                    }
                    break;
                case '3':
                    console.log('Goodbye!');
                    process.exit(0);
                default:
                    console.log('Invalid choice.');
            }
        }
    }
}
exports.AuthMenu = AuthMenu;
