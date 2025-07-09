"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewServerDetails = viewServerDetails;
// client/usecases/viewServerDetails.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function viewServerDetails() {
    const id = readline_sync_1.default.questionInt('Enter External Server ID: ');
    if (!validator_1.Validator.isPositiveNumber(id)) {
        console.log('Invalid Server ID.');
        return;
    }
    try {
        const server = await ApiService_1.ApiService.getServerById(id);
        console.log(`\n=== Server Details ===`);
        console.log(`ID: ${server.id}`);
        console.log(`Name: ${server.name}`);
        console.log(`Status: ${server.is_active ? 'Active' : 'Inactive'}`);
        console.log(`API Key: ${server.api_key}`);
        console.log(`Last Accessed: ${server.last_accessed}`);
    }
    catch (err) {
        console.error('Failed to fetch external server details:', err.message);
    }
}
