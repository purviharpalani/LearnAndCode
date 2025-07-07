"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewsCategory = addNewsCategory;
// src/usecases/addNewsCategory.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function addNewsCategory() {
    const name = readline_sync_1.default.question('Enter new category name: ');
    if (!validator_1.Validator.isNonEmptyString(name)) {
        console.log('Category name cannot be empty.');
        return;
    }
    try {
        await ApiService_1.ApiService.addCategory(name); // ✅ call the ApiService method
        console.log('Category added successfully.');
    }
    catch (err) {
        console.error('Failed to add category:', err.message);
    }
}
