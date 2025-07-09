import cron from 'node-cron';
import { NewsFetchJobService } from '../services/NewsFetchJobService';
import { Logger } from '../../infrastructure/logger/Logger';

export class NewsFetcherScheduler {
  private static logger = Logger.getInstance();
  private static service = new NewsFetchJobService();

  public static start(): void {
    if (process.env.ENABLE_NEWS_FETCH_JOB === 'false') {
      this.logger.info('[NewsFetcherScheduler] Job disabled via .env');
      return;
    }

    const cronExpr = process.env.CRON_NEWS_FETCH || '0 */3 * * *';

    this.logger.info('[NewsFetcherScheduler] Running initial fetch...');
    this.service.run().catch(err => 
      this.logger.error('[Initial Fetch Error]', {
        message: err.message,
        stack: err.stack,
      })
    );

    cron.schedule(cronExpr, async () => {
      this.logger.info('[NewsFetcherScheduler] Running scheduled fetch...');
      try {
        await this.service.run();
        this.logger.info('[NewsFetcherScheduler] Scheduled fetch complete.');
      } catch (err: any) {
        this.logger.error('[Scheduled Fetch Error]', {
          message: err.message,
          stack: err.stack,
        });
      }
    });
  }
}
