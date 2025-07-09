import readlineSync from 'readline-sync';
import { sessionManager } from '../session/sessionManager';
import { DateUtils } from '../utils/DateUtils';
import { viewHeadlinesToday } from '../usecases/viewHeadlinesToday';
import { viewHeadlinesByDateAndCategory } from '../usecases/viewHeadlinesByDateAndCategory';
import { viewSavedArticles } from '../usecases/viewSavedArticles';
import { searchArticles } from '../usecases/searchArticles';
import { NotificationMenu } from './NotificationMenu';
import { Validator } from '../utils/validator';
import { reportArticle } from '../usecases/reportArticle';

export class UserMenu {
  async run(): Promise<void> {
    const session = sessionManager.getSession();

    if (!session) {
      console.log('No active session. Please login again.');
      return;
    }

    while (true) {
      const date = DateUtils.getCurrentDetailedDate();
      const time = DateUtils.getCurrentDetailedTime();

      console.log(`\nWelcome to the News Application, ${session.username}! Date: ${date}`);
      console.log(`Time: ${time}`);
      console.log('Please choose the options below');
      console.log('1. Headlines');
      console.log('2. Saved Articles');
      console.log('3. Search');
      console.log('4. Notifications');
      console.log('5. Report Article');
      console.log('6. Logout');

      const choice = readlineSync.question('Choose an option: ');

      switch (choice) {
        case '1':
          await this.handleHeadlinesMenu(session.username);
          break;

        case '2':
          await viewSavedArticles();
          break;

        case '3':
          await searchArticles();
          break;

        case '4':
          await new NotificationMenu().run();
          break;

        case '5':
          await reportArticle();
          break;

        case '6':
          sessionManager.clearSession();
          console.log('Logged out successfully.');
          return;

        default:
          console.log('Invalid option. Try again.');
      }
    }
  }

  private async handleHeadlinesMenu(username: string): Promise<void> {
    const date = DateUtils.getCurrentDetailedDate();
    const time = DateUtils.getCurrentDetailedTime();

    console.log(`\nWelcome to the News Application, ${username}! Date: ${date}`);
    console.log(`Time: ${time}`);
    console.log('Please choose the options below');
    console.log('1. Today');
    console.log('2. Date range');
    console.log('3. Logout');

    const subChoice = readlineSync.question('Choose an option: ');

    switch (subChoice) {
      case '1':
        await viewHeadlinesToday();
        break;

      case '2':
        const startDate = readlineSync.question('Enter Start Date (YYYY-MM-DD): ');
        const endDate = readlineSync.question('Enter End Date (YYYY-MM-DD): ');

        if (!Validator.isValidDate(startDate) || !Validator.isValidDate(endDate)) {
            console.log('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }

        console.log(`\nWelcome to the News Application, ${username}! Date: ${date}`);
        console.log(`Time: ${time}`);
        console.log('Please choose the options below for Headlines');
        console.log('1. All');
        console.log('2. Business');
        console.log('3. Entertainment');
        console.log('4. Sports');
        console.log('5. Technology');

        const categoryOptions = ['all', 'business', 'entertainment', 'sports', 'technology'];
        const catIndex = readlineSync.questionInt('Choose a category: ');

        const selectedCategory = categoryOptions[catIndex - 1] || 'all';
        await viewHeadlinesByDateAndCategory(startDate, endDate, selectedCategory);
        break;

      case '3':
        sessionManager.clearSession();
        console.log('Logged out successfully.');
        process.exit(0);

      default:
        console.log('Invalid option. Returning to main menu.');
    }
  }
}
