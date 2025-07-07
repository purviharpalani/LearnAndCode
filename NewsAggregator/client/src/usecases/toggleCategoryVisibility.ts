import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';

export async function toggleCategoryVisibility(): Promise<void> {
  const id = readlineSync.questionInt('Enter Category ID: ');
  const action = readlineSync.keyInSelect(['Hide', 'Unhide'], 'Choose action:');

  if (action === -1) return;

  const hide = action === 0;

  try {
    await ApiService.toggleCategoryVisibility(id, hide);
    console.log(`Category ${hide ? 'hidden' : 'unhidden'} successfully.`);
  } catch (err: any) {
    console.error('Failed to update category:', err.message);
  }
}
