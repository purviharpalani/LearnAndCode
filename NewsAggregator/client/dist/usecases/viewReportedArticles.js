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
        reports.forEach((report) => {
            if (!report.article) {
                console.log(`[${report.id}] Article not found (possibly deleted).`);
                return;
            }
            console.log(`\n[${report.id}] ${report.article.title}`);
            console.log(`Reason: ${report.reason}`);
            console.log(`Reported By: ${report.user?.name || 'Unknown'}`);
            console.log(`URL: ${report.article.url}`);
            console.log(`Date: ${new Date(report.created_at).toLocaleString()}`);
        });
    }
    catch (err) {
        console.error('Failed to fetch reports:', err.message);
    }
}
