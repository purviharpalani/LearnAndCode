import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function viewHeadlinesByDateAndCategory(
  startDate: string,
  endDate: string,
  category: string
): Promise<void> {
  if (!Validator.isValidDate(startDate) || !Validator.isValidDate(endDate)) {
    console.log('Invalid date format. Please use YYYY-MM-DD.');
    return;
  }

  if (!Validator.isDateRangeValid(startDate, endDate)) {
    console.log('End date must be after or equal to start date.');
    return;
  }

  try {
    const articles = await ApiService.getArticlesByDateRange(startDate, endDate);
    const filtered = category === 'all'
      ? articles
      : articles.filter((a) => a.category === category);

    if (!filtered.length) {
      console.log('No articles found.');
      return;
    }

    console.log(`\n=== Headlines (${category.toUpperCase()}) from ${startDate} to ${endDate} ===`);
    filtered.forEach((a) => {
      console.log(`\n[${a.id}] ${a.title}`);
      console.log(`Category: ${a.category}`);
      console.log(`URL: ${a.url}`);
    });
  } catch (err: any) {
    console.error('Error fetching headlines:', err.message);
  }
}
