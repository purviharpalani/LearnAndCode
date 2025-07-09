// src/usecases/viewReportedArticles.ts
import { ApiService } from '../services/ApiService';

type ReportedArticle = {
  article: { title: string };
  user: { username: string };
  reason: string;
  reported_at: string;
};

export async function viewReportedArticles(): Promise<void> {
  try {
    const reports = await ApiService.getReportedArticles();

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
  } catch (err: any) {
    console.error('Failed to fetch reports:', err.message);
  }
}

