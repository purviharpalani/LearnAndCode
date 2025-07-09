"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewHeadlinesToday = viewHeadlinesToday;
// src/usecases/viewHeadlinesToday.ts
const ApiService_1 = require("../services/ApiService");
async function viewHeadlinesToday() {
    try {
        const articles = await ApiService_1.ApiService.getTodaysHeadlines();
        if (!articles.length) {
            console.log('No headlines found for today.');
            return;
        }
        console.log('\n=== Today\'s Headlines ===');
        articles.forEach((a) => {
            console.log(`\n[${a.id}] ${a.title}`);
            console.log(`Category: ${a.category}`);
            console.log(`URL: ${a.url}`);
        });
    }
    catch (err) {
        console.error('Error fetching headlines:', err.message);
    }
}
