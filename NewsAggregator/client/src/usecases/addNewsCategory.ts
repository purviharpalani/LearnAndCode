// src/usecases/addNewsCategory.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';
export async function addNewsCategory(): Promise<void> {
  const name = readlineSync.question('Enter new category name: ');

  if (!Validator.isNonEmptyString(name)) {
  console.log('Category name cannot be empty.');
  return;
}

  try {
    await ApiService.addCategory(name);  // ✅ call the ApiService method
    console.log('Category added successfully.');
  } catch (err: any) {
    console.error('Failed to add category:', err.message);
  }
}
