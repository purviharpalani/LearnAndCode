import { NewsFetcherScheduler } from './schedulers/NewsFetcherScheduler';
import { NotificationScheduler } from './schedulers/NotificationScheduler';

export function startAllJobs() {
  NewsFetcherScheduler.start();
  NotificationScheduler.start();
}
