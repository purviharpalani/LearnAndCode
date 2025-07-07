import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function hideOrUnhideCategory(): Promise<void> {
  const id = readlineSync.questionInt('Enter Category ID: ');
  const action = readlineSync.keyInYNStrict('Hide this category?');

  if (!Validator.isPositiveNumber(id)) {
    console.log('Invalid category ID.');
    return;
  }

  try {
    await ApiService.toggleCategoryVisibility(id, action);
    console.log(`Category ${action ? 'hidden' : 'made visible'} successfully.`);
  } catch (err: any) {
    console.error('Failed to update category visibility:', err.message);
  }
}