// src/usecases/viewSavedArticles.ts
import { ApiService } from '../services/ApiService';

export async function viewSavedArticles(): Promise<void> {
  try {
    const articles = await ApiService.getSavedArticles();
    if (!articles.length) {
      console.log('No saved articles found.');
      return;
    }

    console.log('\n=== Saved Articles ===');
    articles.forEach((a) => {
      console.log(`\n[${a.id}] ${a.title}`);
      console.log(`Category: ${a.category}`);
      console.log(`URL: ${a.url}`);
    });
  } catch (err: any) {
    console.error('Error fetching saved articles:', err.message);
  }
}
