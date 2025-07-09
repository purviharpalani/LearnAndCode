"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchArticles = searchArticles;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const saveArticle_1 = require("./saveArticle");
const validator_1 = require("../utils/validator");
async function searchArticles() {
    const query = readline_sync_1.default.question('Enter search term: ').trim();
    if (!validator_1.Validator.isNonEmpty(query)) {
        console.log('Search term cannot be empty.');
        return;
    }
    const useDate = readline_sync_1.default.keyInYN('Filter by date range?');
    let startDate = '', endDate = '';
    if (useDate) {
        startDate = readline_sync_1.default.question('Start Date (YYYY-MM-DD): ');
        endDate = readline_sync_1.default.question('End Date (YYYY-MM-DD): ');
        if (!validator_1.Validator.isValidDate(startDate) || !validator_1.Validator.isValidDate(endDate)) {
            console.log('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }
        if (!validator_1.Validator.isDateRangeValid(startDate, endDate)) {
            console.log('End date must be after or equal to start date.');
            return;
        }
    }
    const sortOptions = ['recent', 'likes', 'dislikes'];
    const sortIndex = readline_sync_1.default.keyInSelect(sortOptions, 'Sort by:', { cancel: false });
    const sortBy = sortOptions[sortIndex];
    try {
        const articles = await ApiService_1.ApiService.searchArticles(query, sortBy);
        if (!articles.length) {
            console.log('No results found.');
            return;
        }
        articles.forEach((a) => {
            console.log(`\n[${a.id}] ${a.title}`);
            console.log(`Category: ${a.category} | Likes: ${a.likes ?? 0} | Dislikes: ${a.dislikes ?? 0}`);
            console.log(`URL: ${a.url}\n`);
        });
        while (true) {
            console.log('\n1. Save Article');
            console.log('2. Logout');
            console.log('3. Back');
            const choice = readline_sync_1.default.question('Choose option: ');
            if (choice === '1')
                await (0, saveArticle_1.saveArticle)();
            else if (choice === '2')
                process.exit(0);
            else if (choice === '3')
                return;
            else
                console.log('Invalid choice.');
        }
    }
    catch (err) {
        console.error('[Search] Failed:', err.message);
    }
}
