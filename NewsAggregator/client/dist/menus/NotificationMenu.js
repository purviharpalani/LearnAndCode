"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMenu = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
const sessionManager_1 = require("../session/sessionManager");
const NotificationService_1 = require("../services/NotificationService");
class NotificationMenu {
    async run() {
        const session = sessionManager_1.sessionManager.getSession();
        if (!session) {
            console.log('No active session found.');
            return;
        }
        const userId = session.userId;
        while (true) {
            console.log('\n=== Notification Preferences ===');
            console.log('1. View Preferences');
            console.log('2. Toggle Category');
            console.log('3. Set Keywords');
            console.log('4. Back');
            const choice = readline_sync_1.default.question('Choose option: ');
            switch (choice) {
                case '1':
                    await this.viewPreferences(userId);
                    break;
                case '2':
                    await this.toggleCategory(userId);
                    break;
                case '3':
                    await this.setKeywords(userId);
                    break;
                case '4':
                    return;
                default:
                    console.log('Invalid choice.');
            }
        }
    }
    async viewPreferences(userId) {
        try {
            const prefs = await NotificationService_1.NotificationService.getPreferences(userId);
            console.log('\n=== Your Preferences ===');
            prefs.forEach((p, idx) => {
                console.log(`${idx + 1}. ${p.category ?? 'Keywords'} - ${p.enabled ? 'Enabled' : 'Disabled'} - ${p.keywords?.join(', ') || ''}`);
            });
        }
        catch (err) {
            console.error('Error fetching preferences:', err.message);
        }
    }
    async toggleCategory(userId) {
        console.log('\n1. Business\n2. Entertainment\n3. Sports\n4. Technology');
        const choice = readline_sync_1.default.questionInt('Enter category number to toggle: ');
        try {
            await NotificationService_1.NotificationService.toggleCategory(userId, choice);
            console.log('Category toggled successfully.');
        }
        catch (err) {
            console.error('Failed to toggle category:', err.message);
        }
    }
    async setKeywords(userId) {
        const input = readline_sync_1.default.question('Enter keywords (comma-separated): ');
        const keywords = input.split(',').map(k => k.trim()).filter(Boolean);
        try {
            await NotificationService_1.NotificationService.setKeywords(userId, keywords);
            console.log('Keywords updated.');
        }
        catch (err) {
            console.error('Failed to update keywords:', err.message);
        }
    }
}
exports.NotificationMenu = NotificationMenu;
