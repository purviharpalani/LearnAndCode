"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewExternalServers = viewExternalServers;
const ApiService_1 = require("../services/ApiService");
async function viewExternalServers() {
    try {
        const servers = await ApiService_1.ApiService.getExternalServerStatus();
        console.log('\n=== External Servers Status ===');
        servers.forEach((s, i) => {
            const status = s.is_active ? '✅ Active' : '❌ Inactive';
            console.log(`${i + 1}. ${s.name} - ${status} - Last Accessed: ${s.last_accessed}`);
        });
    }
    catch (err) {
        console.error('Failed to fetch external server status:', err.message);
    }
}
