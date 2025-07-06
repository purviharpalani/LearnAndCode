import readlineSync from 'readline-sync';
import { sessionManager } from '../session/sessionManager';
import { NotificationService } from '../services/NotificationService';

export class NotificationMenu {
  async run(): Promise<void> {
    const session = sessionManager.getSession();
    if (!session) {
      console.log('No active session found.');
      return;
    }

    const userId = session.userId;

    while (true) {
      console.log('\n=== Notification Preferences ===');
      console.log('1. View Preferences');
      console.log('2. Toggle Category');
      console.log('3. Set Keywords');
      console.log('4. Back');

      const choice = readlineSync.question('Choose option: ');

      switch (choice) {
        case '1':
          await this.viewPreferences(userId);
          break;
        case '2':
          await this.toggleCategory(userId);
          break;
        case '3':
          await this.setKeywords(userId);
          break;
        case '4':
          return;
        default:
          console.log('Invalid choice.');
      }
    }
  }

  private async viewPreferences(userId: number): Promise<void> {
    try {
      const prefs = await NotificationService.getPreferences(userId);
      console.log('\n=== Your Preferences ===');
      prefs.forEach((p, idx) => {
        console.log(`${idx + 1}. ${p.category ?? 'Keywords'} - ${p.enabled ? 'Enabled' : 'Disabled'} - ${p.keywords?.join(', ') || ''}`);
      });
    } catch (err: any) {
      console.error('Error fetching preferences:', err.message);
    }
  }

  private async toggleCategory(userId: number): Promise<void> {
    console.log('\n1. Business\n2. Entertainment\n3. Sports\n4. Technology');
    const choice = readlineSync.questionInt('Enter category number to toggle: ');
    try {
      await NotificationService.toggleCategory(userId, choice);
      console.log('Category toggled successfully.');
    } catch (err: any) {
      console.error('Failed to toggle category:', err.message);
    }
  }

  private async setKeywords(userId: number): Promise<void> {
    const input = readlineSync.question('Enter keywords (comma-separated): ');
    const keywords = input.split(',').map(k => k.trim()).filter(Boolean);
    try {
      await NotificationService.setKeywords(userId, keywords);
      console.log('Keywords updated.');
    } catch (err: any) {
      console.error('Failed to update keywords:', err.message);
    }
  }
}
