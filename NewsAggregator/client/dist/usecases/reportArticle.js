"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportArticle = reportArticle;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function reportArticle() {
    const articleId = readline_sync_1.default.questionInt('Enter Article ID to report: ');
    const reason = readline_sync_1.default.question('Enter reason for reporting: ').trim();
    if (!validator_1.Validator.isPositiveNumber(articleId)) {
        console.log('Invalid article ID.');
        return;
    }
    if (!validator_1.Validator.isNonEmptyString(reason)) {
        console.log('Reason cannot be empty.');
        return;
    }
    try {
        await ApiService_1.ApiService.reportArticle(articleId, reason);
        console.log('Report submitted successfully.');
    }
    catch (err) {
        console.error('Failed to report article:', err.message);
    }
}
