"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCategoryVisibility = toggleCategoryVisibility;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
async function toggleCategoryVisibility() {
    const id = readline_sync_1.default.questionInt('Enter Category ID: ');
    const action = readline_sync_1.default.keyInSelect(['Hide', 'Unhide'], 'Choose action:');
    if (action === -1)
        return;
    const hide = action === 0;
    try {
        await ApiService_1.ApiService.toggleCategoryVisibility(id, hide);
        console.log(`Category ${hide ? 'hidden' : 'unhidden'} successfully.`);
    }
    catch (err) {
        console.error('Failed to update category:', err.message);
    }
}
