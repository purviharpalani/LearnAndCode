"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMenu = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
const sessionManager_1 = require("../session/sessionManager");
const DateUtils_1 = require("../utils/DateUtils");
const viewHeadlinesToday_1 = require("../usecases/viewHeadlinesToday");
const viewHeadlinesByDateAndCategory_1 = require("../usecases/viewHeadlinesByDateAndCategory");
const viewSavedArticles_1 = require("../usecases/viewSavedArticles");
const searchArticles_1 = require("../usecases/searchArticles");
const NotificationMenu_1 = require("./NotificationMenu");
const validator_1 = require("../utils/validator");
class UserMenu {
    async run() {
        const session = sessionManager_1.sessionManager.getSession();
        if (!session) {
            console.log('No active session. Please login again.');
            return;
        }
        while (true) {
            const date = DateUtils_1.DateUtils.getCurrentDetailedDate();
            const time = DateUtils_1.DateUtils.getCurrentDetailedTime();
            console.log(`\nWelcome to the News Application, ${session.username}! Date: ${date}`);
            console.log(`Time: ${time}`);
            console.log('Please choose the options below');
            console.log('1. Headlines');
            console.log('2. Saved Articles');
            console.log('3. Search');
            console.log('4. Notifications');
            console.log('5. Logout');
            const choice = readline_sync_1.default.question('Choose an option: ');
            switch (choice) {
                case '1':
                    await this.handleHeadlinesMenu(session.username);
                    break;
                case '2':
                    await (0, viewSavedArticles_1.viewSavedArticles)();
                    break;
                case '3':
                    await (0, searchArticles_1.searchArticles)();
                    break;
                case '4':
                    await new NotificationMenu_1.NotificationMenu().run();
                    break;
                case '5':
                    sessionManager_1.sessionManager.clearSession();
                    console.log('Logged out successfully.');
                    return;
                default:
                    console.log('Invalid option. Try again.');
            }
        }
    }
    async handleHeadlinesMenu(username) {
        const date = DateUtils_1.DateUtils.getCurrentDetailedDate();
        const time = DateUtils_1.DateUtils.getCurrentDetailedTime();
        console.log(`\nWelcome to the News Application, ${username}! Date: ${date}`);
        console.log(`Time: ${time}`);
        console.log('Please choose the options below');
        console.log('1. Today');
        console.log('2. Date range');
        console.log('3. Logout');
        const subChoice = readline_sync_1.default.question('Choose an option: ');
        switch (subChoice) {
            case '1':
                await (0, viewHeadlinesToday_1.viewHeadlinesToday)();
                break;
            case '2':
                const startDate = readline_sync_1.default.question('Enter Start Date (YYYY-MM-DD): ');
                const endDate = readline_sync_1.default.question('Enter End Date (YYYY-MM-DD): ');
                if (!validator_1.Validator.isValidDate(startDate) || !validator_1.Validator.isValidDate(endDate)) {
                    console.log('Invalid date format. Please use YYYY-MM-DD.');
                    return;
                }
                console.log(`\nWelcome to the News Application, ${username}! Date: ${date}`);
                console.log(`Time: ${time}`);
                console.log('Please choose the options below for Headlines');
                console.log('1. All');
                console.log('2. Business');
                console.log('3. Entertainment');
                console.log('4. Sports');
                console.log('5. Technology');
                const categoryOptions = ['all', 'business', 'entertainment', 'sports', 'technology'];
                const catIndex = readline_sync_1.default.questionInt('Choose a category: ');
                const selectedCategory = categoryOptions[catIndex - 1] || 'all';
                await (0, viewHeadlinesByDateAndCategory_1.viewHeadlinesByDateAndCategory)(startDate, endDate, selectedCategory);
                break;
            case '3':
                sessionManager_1.sessionManager.clearSession();
                console.log('Logged out successfully.');
                process.exit(0);
            default:
                console.log('Invalid option. Returning to main menu.');
        }
    }
}
exports.UserMenu = UserMenu;
