// src/menus/AuthMenu.ts
import readlineSync from 'readline-sync';
import { signupUser } from '../usecases/signup';
import { loginUser } from '../usecases/login';
import { sessionManager } from '../session/sessionManager';
import { UserMenu } from './UserMenu';
import { showAdminMenu } from './AdminMenu'; 

export class AuthMenu {
  async run(): Promise<void> {
    while (true) {
      console.log('\n=== News Aggregator ===');
      console.log('1. Sign Up');
      console.log('2. Login');
      console.log('3. Exit');

      const choice = readlineSync.question('Choose an option: ');

      switch (choice) {
        case '1':
          await signupUser();
          break;
        case '2':
          await loginUser();
          const session = sessionManager.getSession();
          if (session) {
            if (session.role === 'admin') {
              await showAdminMenu(); 
            } else {
              await new UserMenu().run(); 
            }
          }
          break;
        case '3':
          console.log('Goodbye!');
          process.exit(0);
        default:
          console.log('Invalid choice.');
      }
    }
  }
}
