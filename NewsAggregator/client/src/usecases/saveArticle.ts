// src/usecases/saveArticle.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';
export async function saveArticle(): Promise<void> {
  const articleId = readlineSync.question('Enter Article ID to save: ').trim();
  if (!Validator.isPositiveNumber(articleId)) {
    console.log('Invalid article ID. Must be a positive number.');
    return;
    }
  if (!articleId || isNaN(Number(articleId))) {
    console.log('Invalid article ID.');
    return;
  }

  try {
    await ApiService.saveArticle(Number(articleId));
    console.log('Article saved successfully.');
  } catch (err: any) {
    console.error('Failed to save article:', err.message);
  }
}
