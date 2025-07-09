import cron from 'node-cron';
import { NotificationJobService } from '../services/NotificationJobService';
import { Logger } from '../../infrastructure/logger/Logger';

export class NotificationScheduler {
  private static logger = Logger.getInstance();
  private static service = new NotificationJobService();

  public static start(): void {
    this.logger.info('[NotificationScheduler] Starting...');
    cron.schedule('0 */3 * * *', async () => {
      this.logger.info('[NotificationScheduler] Running...');
      try {
        await this.service.run();
        this.logger.info('[NotificationScheduler] Notification cycle complete.');
      } catch (err: any) {
        this.logger.error('[NotificationScheduler] Error', { message: err.message, stack: err.stack });
      }
    });
  }
}
