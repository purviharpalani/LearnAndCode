"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExternalServer = deleteExternalServer;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ApiService_1 = require("../services/ApiService");
async function deleteExternalServer() {
    try {
        const servers = await ApiService_1.ApiService.getAllExternalServers();
        console.log('\n=== External Servers ===');
        servers.forEach((s, idx) => {
            console.log(`${idx + 1}. ${s.name}`);
        });
        const index = readline_sync_1.default.questionInt('\nSelect server to delete: ') - 1;
        if (index < 0 || index >= servers.length) {
            console.log('Invalid selection.');
            return;
        }
        const server = servers[index];
        const confirm = readline_sync_1.default.keyInYNStrict(`Are you sure you want to delete "${server.name}"?`);
        if (!confirm) {
            console.log('Deletion cancelled.');
            return;
        }
        await ApiService_1.ApiService.deleteExternalServer(server.id);
        console.log(`"${server.name}" deleted successfully.`);
    }
    catch (err) {
        console.error('Failed to delete server:', err.message);
    }
}
