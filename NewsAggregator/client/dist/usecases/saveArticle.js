"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveArticle = saveArticle;
// src/usecases/saveArticle.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function saveArticle() {
    const articleId = readline_sync_1.default.question('Enter Article ID to save: ').trim();
    if (!validator_1.Validator.isPositiveNumber(articleId)) {
        console.log('Invalid article ID. Must be a positive number.');
        return;
    }
    if (!articleId || isNaN(Number(articleId))) {
        console.log('Invalid article ID.');
        return;
    }
    try {
        await ApiService_1.ApiService.saveArticle(Number(articleId));
        console.log('Article saved successfully.');
    }
    catch (err) {
        console.error('Failed to save article:', err.message);
    }
}
