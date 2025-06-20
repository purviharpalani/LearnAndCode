import readlineSync from 'readline-sync';
import { sessionManager } from '../utils/sessionManager';
import { viewHeadlines } from '../protocol/viewHeadlines';
import { saveArticle } from '../protocol/saveArticle';
import { viewSavedArticles } from '../protocol/viewSavedArticles';

export async function showUserMenu() {
  while (true) {
    const session = sessionManager.getSession();
    if (!session) break;

    console.log(`\n=== Welcome, ${session.username} ===`);
    console.log('1. View Headlines');
    console.log('2. Save Article');
    console.log('3. View Saved Articles');
    console.log('4. Logout');

    const choice = readlineSync.question('Choose an option: ');

    if (choice === '1') {
      await viewHeadlines();
    } else if (choice === '2') {
      await saveArticle();
    } else if (choice === '3') {
      await viewSavedArticles();
    } else if (choice === '4') {
      sessionManager.clearSession();
      console.log('Logged out.');
      break;
    } else {
      console.log('Invalid choice.');
    }
  }
}
