import readlineSync from 'readline-sync';
import { signupUser } from '../protocol/signup';
import { loginUser } from '../protocol/login';
import { sessionManager } from '../utils/sessionManager';
import { showUserMenu } from './UserMenu';

export async function showAuthMenu() {
  while (true) {
    console.log('\n=== News Aggregator ===');
    console.log('1. Sign Up');
    console.log('2. Login');
    console.log('3. Exit');

    const choice = readlineSync.question('Choose an option: ');

    if (choice === '1') {
      await signupUser();
    } else if (choice === '2') {
      await loginUser();
      if (sessionManager.getSession()) {
        await showUserMenu();
      }
    } else if (choice === '3') {
      console.log('Goodbye!');
      process.exit(0);
    } else {
      console.log('Invalid choice.');
    }
  }
}
