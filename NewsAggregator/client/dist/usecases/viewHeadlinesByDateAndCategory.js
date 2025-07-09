"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewHeadlinesByDateAndCategory = viewHeadlinesByDateAndCategory;
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function viewHeadlinesByDateAndCategory(startDate, endDate, category) {
    if (!validator_1.Validator.isValidDate(startDate) || !validator_1.Validator.isValidDate(endDate)) {
        console.log('Invalid date format. Please use YYYY-MM-DD.');
        return;
    }
    if (!validator_1.Validator.isDateRangeValid(startDate, endDate)) {
        console.log('End date must be after or equal to start date.');
        return;
    }
    console.log(`[CLIENT] Fetching headlines from ${startDate} to ${endDate} with category ${category}`);
    try {
        const articles = await ApiService_1.ApiService.getArticlesByDateRange(startDate, endDate);
        const filtered = category === 'all'
            ? articles
            : articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
        if (!filtered.length) {
            console.log('No articles found.');
            return;
        }
        console.log(`\n=== Headlines (${category.toUpperCase()}) from ${startDate} to ${endDate} ===`);
        filtered.forEach((a) => {
            console.log(`\n[${a.id}] ${a.title}`);
            console.log(`Category: ${a.category}`);
            console.log(`URL: ${a.url}`);
        });
    }
    catch (err) {
        console.error('[CLIENT ERROR] Failed to fetch headlines:');
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);
        console.error('Full error:', err);
    }
}
