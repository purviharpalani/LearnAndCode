// src/usecases/viewHeadlinesToday.ts
import { ApiService } from '../services/ApiService';

export async function viewHeadlinesToday(): Promise<void> {
  try {
    const articles = await ApiService.getTodaysHeadlines();
    if (!articles.length) {
      console.log('No headlines found for today.');
      return;
    }

    console.log('\n=== Today\'s Headlines ===');
    articles.forEach((a) => {
      console.log(`\n[${a.id}] ${a.title}`);
      console.log(`Category: ${a.category}`);
      console.log(`URL: ${a.url}`);
    });
  } catch (err: any) {
    console.error('Error fetching headlines:', err.message);
  }
}
