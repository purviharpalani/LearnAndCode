import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function hideArticle(): Promise<void> {
  const articleId = readlineSync.questionInt('Enter Article ID to hide: ');

  if (!Validator.isPositiveNumber(articleId)) {
    console.log('Invalid article ID.');
    return;
  }

  try {
    await ApiService.hideArticle(articleId);
    console.log('Article hidden successfully.');
  } catch (err: any) {
    console.error('Failed to hide article:', err.message);
  }
}
