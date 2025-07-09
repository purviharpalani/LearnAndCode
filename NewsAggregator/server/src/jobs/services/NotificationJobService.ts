import { NotificationPreference, Notification, User, NewsArticle } from '../../entities';
import { Logger } from '../../infrastructure/logger/Logger';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { MailService } from '../../infrastructure/mail/MailService';
import { NewsFetchJobService } from './NewsFetchJobService';

export class NotificationJobService {
  private logger = Logger.getInstance();
  private fetchJob = new NewsFetchJobService();

  public async run(): Promise<void> {
    const newArticles = await this.fetchJob.run(); // ✅ Only newly fetched
    if (!newArticles.length) {
      this.logger.info('[NotificationJob] No new articles to notify.');
      return;
    }

    const users = await UserRepository.findAllWithPreferences();

    for (const user of users) {
      const prefs = user.notificationPreferences || [];

      if (prefs.length === 0) continue;

      const categories = prefs
        .filter(p => p.category && p.enabled)
        .map(p => p.category);

      const keywordPref = prefs.find(p => !p.category && p.enabled);
      let keywords: string[] = [];
      if (Array.isArray(keywordPref?.keywords)) {
        keywords = keywordPref.keywords;
      } else if (typeof keywordPref?.keywords === 'string') {
        keywords = keywordPref.keywords.split(',').map(k => k.trim());
      }

      const matches = newArticles.filter((article: NewsArticle) =>
        categories.includes(article.category) ||
        keywords.some(k =>
          article.title?.toLowerCase().includes(k.toLowerCase()) ||
          article.description?.toLowerCase().includes(k.toLowerCase())
        )
      );

      if (matches.length === 0) continue;

      const notifications: Notification[] = [];
      const htmlParts: string[] = [];

      for (const article of matches) {
        const alreadySent = await NotificationRepository.findByUserAndArticle(user.id, article.id);
        if (alreadySent) continue;

notifications.push(
  NotificationRepository.create({
    user,
    user_id: user.id,
    title: article.title,
    message: article.description || '',
    related_article_id: article.id,
    created_at: new Date(),
  })
);


        htmlParts.push(`
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}">Read more</a>
          <hr />
        `);
      }

      if (notifications.length > 0) {
        await NotificationRepository.saveAll(notifications);

        await MailService.send(
          user.email,
          `📰 Your News Digest (${notifications.length} articles)`,
          `<div><p>Here’s what’s new based on your preferences:</p>${htmlParts.join('\n')}</div>`
        );

        this.logger.info(`[NotificationJob] Sent ${notifications.length} articles to ${user.email}`);
      }
    }
  }
}
