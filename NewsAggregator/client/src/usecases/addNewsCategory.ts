// client/usecases/addNewsCategory.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function addNewsCategory(): Promise<void> {
  const name = readlineSync.question('Enter new category name: ').trim();

  if (!Validator.isNonEmptyString(name)) {
    console.log('Category name cannot be empty.');
    return;
  }

  try {
    await ApiService.addNewsCategory(name);
    console.log('Category added successfully.');
  } catch (err: any) {
    if (err.response?.status === 409) {
      console.log('Category already exists.');
    } else {
      console.error('Failed to add category:', err.message);
    }
  }
}
