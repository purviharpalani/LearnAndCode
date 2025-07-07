// src/menus/AdminMenu.ts
import readlineSync from 'readline-sync';
import { viewExternalServers } from '../usecases/viewExternalServers';
import { viewServerDetails } from '../usecases/viewServerDetails';
import { updateServerDetails } from '../usecases/editExternalServer';
import { addNewsCategory } from '../usecases/addNewsCategory';
import { sessionManager } from '../session/sessionManager';
import { deleteExternalServer } from '../usecases/deleteExternalServer';
import { AuthMenu } from './AuthMenu';
import { viewReportedArticles } from '../usecases/viewReportedArticles';
import { hideArticle } from '../usecases/hideArticle';
import { hideOrUnhideCategory } from '../usecases/hideOrUnhideCategory';
import { viewHiddenCategories } from '../usecases/viewHiddenCategories';

export async function showAdminMenu(): Promise<void> {
  while (true) {
    console.log('\n=== ADMIN MENU ===');
    console.log('1. View External Server Status');
    console.log('2. View Server Details');
    console.log('3. Edit Server Details');
    console.log('4. Add News Category');
    console.log('5. Delete External Server');
    console.log('6. View Reported Articles');
    console.log('7. Hide an Article');
    console.log('8. Hide/Unhide News Category');
    console.log('9. View Hidden Categories');
    console.log('10. Logout');

    const choice = readlineSync.question('Choose an option: ');

    switch (choice) {
        case '1':
            await viewExternalServers();
            break;
        case '2':
            await viewServerDetails();
            break;
        case '3':
            await updateServerDetails();
            break;
        case '4':
            await addNewsCategory();
            break;
        case '5':
            await deleteExternalServer();
            break;
        case '6':
            await viewReportedArticles();
            break;
        case '7':
            await hideArticle();
            break;
        case '8':
            await hideOrUnhideCategory();
            break;
        case '9':
            await viewHiddenCategories();
            break;
        case '10':
            sessionManager.clearSession();
            console.log('Logged out.');
            return;
        default:
            console.log('Invalid option.');
        }
    }
}
