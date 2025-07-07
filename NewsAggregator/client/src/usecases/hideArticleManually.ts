import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';

export async function hideArticleManually(): Promise<void> {
  const articleId = readlineSync.questionInt('Enter Article ID to hide: ');

  try {
    await ApiService.hideArticle(articleId);
    console.log('Article hidden successfully.');
  } catch (err: any) {
    console.error('Failed to hide article:', err.message);
  }
}
