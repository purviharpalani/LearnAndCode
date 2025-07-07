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
    const reports: ReportedArticle[] = await ApiService.getReportedArticles();

    if (!reports.length) {
      console.log('No reported articles.');
      return;
    }

    console.log('\n=== Reported Articles ===');
    reports.forEach((r: ReportedArticle, i: number) => {
      console.log(`\n${i + 1}. Article: ${r.article.title}`);
      console.log(`   Reported by: ${r.user.username}`);
      console.log(`   Reason: ${r.reason}`);
      console.log(`   Reported on: ${r.reported_at}`);
    });
  } catch (err: any) {
    console.error('Failed to fetch reports:', err.message);
  }
}
