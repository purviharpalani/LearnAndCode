"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSavedArticles = viewSavedArticles;
// src/usecases/viewSavedArticles.ts
const ApiService_1 = require("../services/ApiService");
async function viewSavedArticles() {
    try {
        const articles = await ApiService_1.ApiService.getSavedArticles();
        if (!articles.length) {
            console.log('No saved articles found.');
            return;
        }
        console.log('\n=== Saved Articles ===');
        articles.forEach((a) => {
            console.log(`\n[${a.id}] ${a.title}`);
            console.log(`Category: ${a.category}`);
            console.log(`URL: ${a.url}`);
        });
    }
    catch (err) {
        console.error('Error fetching saved articles:', err.message);
    }
}
