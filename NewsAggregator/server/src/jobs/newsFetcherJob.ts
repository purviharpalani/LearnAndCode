import cron from 'node-cron';
import { NewsService } from '../services/NewsService';

export const startNewsFetcherJob = () => {
  // Runs every 3 hours
  cron.schedule('0 */3 * * *', async () => {
    console.log('[Cron Job] Fetching news articles...');
    await NewsService.fetchAndStoreNews();
  });

  console.log('[Cron Job] Scheduled news fetch every 3 hours.');
};
