"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideOrUnhideCategory = hideOrUnhideCategory;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function hideOrUnhideCategory() {
    const id = readline_sync_1.default.questionInt('Enter Category ID: ');
    const action = readline_sync_1.default.keyInYNStrict('Hide this category?');
    if (!validator_1.Validator.isPositiveNumber(id)) {
        console.log('Invalid category ID.');
        return;
    }
    try {
        await ApiService_1.ApiService.toggleCategoryVisibility(id, action);
        console.log(`Category ${action ? 'hidden' : 'made visible'} successfully.`);
    }
    catch (err) {
        console.error('Failed to update category visibility:', err.message);
    }
}
