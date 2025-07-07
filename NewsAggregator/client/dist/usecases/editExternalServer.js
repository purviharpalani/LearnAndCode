"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServerDetails = updateServerDetails;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function updateServerDetails() {
    const id = readline_sync_1.default.questionInt('Enter External Server ID: ');
    if (!validator_1.Validator.isPositiveNumber(id)) {
        console.log('Invalid Server ID.');
        return;
    }
    const apiKey = readline_sync_1.default.question('Enter updated API key: ').trim();
    if (!validator_1.Validator.isNonEmptyString(apiKey)) {
        console.log('API Key cannot be empty.');
        return;
    }
    try {
        await ApiService_1.ApiService.updateExternalServer(id, { api_key: apiKey });
        console.log('Server API key updated successfully.');
    }
    catch (err) {
        console.error('Failed to update server:', err.message);
    }
}
