"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAdminMenu = showAdminMenu;
// src/menus/AdminMenu.ts
const readline_sync_1 = __importDefault(require("readline-sync"));
const viewExternalServers_1 = require("../usecases/viewExternalServers");
const viewServerDetails_1 = require("../usecases/viewServerDetails");
const editExternalServer_1 = require("../usecases/editExternalServer");
const addNewsCategory_1 = require("../usecases/addNewsCategory");
const sessionManager_1 = require("../session/sessionManager");
const deleteExternalServer_1 = require("../usecases/deleteExternalServer");
async function showAdminMenu() {
    while (true) {
        console.log('\n=== ADMIN MENU ===');
        console.log('1. View External Server Status');
        console.log('2. View Server Details');
        console.log('3. Edit Server Details');
        console.log('4. Add News Category');
        console.log('5. Delete External Server');
        console.log('6. Logout');
        const choice = readline_sync_1.default.question('Choose an option: ');
        switch (choice) {
            case '1':
                await (0, viewExternalServers_1.viewExternalServers)();
                break;
            case '2':
                await (0, viewServerDetails_1.viewServerDetails)();
                break;
            case '3':
                await (0, editExternalServer_1.updateServerDetails)();
                break;
            case '4':
                await (0, addNewsCategory_1.addNewsCategory)();
                break;
            case '5':
                await (0, deleteExternalServer_1.deleteExternalServer)();
                break;
            case '6':
                sessionManager_1.sessionManager.clearSession();
                console.log('Logged out.');
                return;
            default:
                console.log('Invalid option.');
        }
    }
}
