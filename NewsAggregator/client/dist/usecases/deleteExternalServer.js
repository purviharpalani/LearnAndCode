"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExternalServer = deleteExternalServer;
// client/usecases/deleteExternalServer.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
const validator_1 = require("../utils/validator");
async function deleteExternalServer() {
    const id = readline_sync_1.default.questionInt('Enter ID of the server to delete: ');
    if (!validator_1.Validator.isPositiveNumber(id)) {
        console.log('Invalid ID.');
        return;
    }
    const confirm = readline_sync_1.default.keyInYN(`Are you sure you want to delete server ID ${id}?`);
    if (!confirm)
        return;
    try {
        await ApiService_1.ApiService.deleteExternalServer(id);
        console.log(`External server ${id} deleted successfully.`);
    }
    catch (err) {
        console.error('Failed to delete external server:', err.message);
    }
}
