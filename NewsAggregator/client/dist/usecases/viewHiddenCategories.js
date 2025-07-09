"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewHiddenCategories = viewHiddenCategories;
const ApiService_1 = require("../services/ApiService");
async function viewHiddenCategories() {
    try {
        const categories = await ApiService_1.ApiService.getHiddenCategories();
        if (!categories.length) {
            console.log('No hidden categories.');
            return;
        }
        console.log('\n=== Hidden Categories ===');
        categories.forEach((category) => {
            console.log(`- ID: ${category.id}, Name: ${category.name}`);
        });
    }
    catch (err) {
        console.error('Failed to fetch hidden categories:', err.message);
    }
}
