import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { saveArticle } from './saveArticle';
import { Validator } from '../utils/validator';

export async function searchArticles(): Promise<void> {
  const query = readlineSync.question('Enter search term: ').trim();
  if (!Validator.isNonEmpty(query)) {
    console.log('Search term cannot be empty.');
    return;
  }

  const useDate = readlineSync.keyInYN('Filter by date range?');
  let startDate = '', endDate = '';

  if (useDate) {
    startDate = readlineSync.question('Start Date (YYYY-MM-DD): ');
    endDate = readlineSync.question('End Date (YYYY-MM-DD): ');

    if (!Validator.isValidDate(startDate) || !Validator.isValidDate(endDate)) {
      console.log('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    if (!Validator.isDateRangeValid(startDate, endDate)) {
      console.log('End date must be after or equal to start date.');
      return;
    }
  }

  const sortOptions = ['recent', 'likes', 'dislikes'];
  const sortIndex = readlineSync.keyInSelect(sortOptions, 'Sort by:', { cancel: false });
  const sortBy = sortOptions[sortIndex];

  try {
    const articles = await ApiService.searchArticles(query, sortBy);

    if (!articles.length) {
      console.log('No results found.');
      return;
    }

    articles.forEach((a: any) => {
      console.log(`\n[${a.id}] ${a.title}`);
      console.log(`Category: ${a.category} | Likes: ${a.likes ?? 0} | Dislikes: ${a.dislikes ?? 0}`);
      console.log(`URL: ${a.url}\n`);
    });

    while (true) {
      console.log('\n1. Save Article');
      console.log('2. Logout');
      console.log('3. Back');

      const choice = readlineSync.question('Choose option: ');
      if (choice === '1') await saveArticle();
      else if (choice === '2') process.exit(0);
      else if (choice === '3') return;
      else console.log('Invalid choice.');
    }
  } catch (err: any) {
    console.error('[Search] Failed:', err.message);
  }
}
