"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewReportedArticles = viewReportedArticles;
// src/usecases/viewReportedArticles.ts
const ApiService_1 = require("../services/ApiService");
async function viewReportedArticles() {
    try {
        const reports = await ApiService_1.ApiService.getReportedArticles();
        if (!reports.length) {
            console.log('No reported articles.');
            return;
        }
        console.log('\n=== Reported Articles ===');
        reports.forEach((r, i) => {
            console.log(`\n${i + 1}. Article: ${r.article.title}`);
            console.log(`   Reported by: ${r.user.username}`);
            console.log(`   Reason: ${r.reason}`);
            console.log(`   Reported on: ${r.reported_at}`);
        });
    }
    catch (err) {
        console.error('Failed to fetch reports:', err.message);
    }
}
