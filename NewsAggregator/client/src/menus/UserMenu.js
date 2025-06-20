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
exports.showUserMenu = showUserMenu;
const readline_sync_1 = __importDefault(require("readline-sync"));
const sessionManager_1 = require("../utils/sessionManager");
const viewHeadlines_1 = require("../protocol/viewHeadlines");
const saveArticle_1 = require("../protocol/saveArticle");
const viewSavedArticles_1 = require("../protocol/viewSavedArticles");
function showUserMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const session = sessionManager_1.sessionManager.getSession();
            if (!session)
                break;
            console.log(`\n=== Welcome, ${session.username} ===`);
            console.log('1. View Headlines');
            console.log('2. Save Article');
            console.log('3. View Saved Articles');
            console.log('4. Logout');
            const choice = readline_sync_1.default.question('Choose an option: ');
            if (choice === '1') {
                yield (0, viewHeadlines_1.viewHeadlines)();
            }
            else if (choice === '2') {
                yield (0, saveArticle_1.saveArticle)();
            }
            else if (choice === '3') {
                yield (0, viewSavedArticles_1.viewSavedArticles)();
            }
            else if (choice === '4') {
                sessionManager_1.sessionManager.clearSession();
                console.log('Logged out.');
                break;
            }
            else {
                console.log('Invalid choice.');
            }
        }
    });
}
