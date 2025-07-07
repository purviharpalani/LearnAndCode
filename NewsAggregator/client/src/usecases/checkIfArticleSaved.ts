// src/usecases/checkIfArticleSaved.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';
export async function checkIfArticleSaved(): Promise<void> {
  const articleId = readlineSync.question('Enter Article ID to check: ').trim();
  if (!Validator.isPositiveNumber(articleId)) {
  console.log('Invalid article ID. Must be a positive number.');
  return;
}
  if (!articleId || isNaN(Number(articleId))) {
    console.log('Invalid article ID.');
    return;
  }

  try {
    const { saved } = await ApiService.checkIfArticleSaved(Number(articleId));
    if (saved) {
      console.log('Article is already saved.');
    } else {
      console.log('Article is not saved.');
    }
  } catch (err: any) {
    console.error('Error checking article status:', err.message);
  }
}
