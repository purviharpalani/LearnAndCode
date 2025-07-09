"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfArticleSaved = checkIfArticleSaved;
// src/usecases/checkIfArticleSaved.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function checkIfArticleSaved() {
    const articleId = readline_sync_1.default.question('Enter Article ID to check: ').trim();
    if (!validator_1.Validator.isPositiveNumber(articleId)) {
        console.log('Invalid article ID. Must be a positive number.');
        return;
    }
    if (!articleId || isNaN(Number(articleId))) {
        console.log('Invalid article ID.');
        return;
    }
    try {
        const { saved } = await ApiService_1.ApiService.checkIfArticleSaved(Number(articleId));
        if (saved) {
            console.log('Article is already saved.');
        }
        else {
            console.log('Article is not saved.');
        }
    }
    catch (err) {
        console.error('Error checking article status:', err.message);
    }
}
