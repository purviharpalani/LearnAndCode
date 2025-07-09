import { ApiService } from '../services/ApiService';

interface Category {
  id: number;
  name: string;
}

export async function viewHiddenCategories(): Promise<void> {
  try {
    const categories: Category[] = await ApiService.getHiddenCategories();

    if (!categories.length) {
      console.log('No hidden categories.');
      return;
    }

    console.log('\n=== Hidden Categories ===');
    categories.forEach((category: Category) => {
      console.log(`- ID: ${category.id}, Name: ${category.name}`);
    });
  } catch (err: any) {
    console.error('Failed to fetch hidden categories:', err.message);
  }
}
