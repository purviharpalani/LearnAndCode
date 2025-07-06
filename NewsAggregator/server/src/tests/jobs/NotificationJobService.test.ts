// @ts-nocheck
import { NotificationJobService } from '../../jobs/services/NotificationJobService';
import { AppDataSource } from '../../config/db';
import { MailService } from '../../infrastructure/mail/MailService';

jest.mock('../../src/config/db', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    })),
  },
}));

jest.mock('../../src/infrastructure/mail/MailService', () => ({
  MailService: {
    send: jest.fn(),
  },
}));

describe('NotificationJobService', () => {
  it('should complete without errors when no users', async () => {
    const service = new NotificationJobService();
    const userRepo = AppDataSource.getRepository('User');
    userRepo.find.mockResolvedValue([]);
    
    await expect(service.run()).resolves.not.toThrow();
  });

  it('should send mail if articles match', async () => {
    const service = new NotificationJobService();
    const user = {
      id: 1,
      email: 'user@example.com',
      notificationPreferences: [
        { category: 'technology', enabled: true }
      ]
    };
    const article = {
      id: 10,
      category: 'technology',
      title: 'AI Revolution',
      description: 'Big shift',
      url: 'http://example.com',
      created_at: new Date()
    };

    const userRepo = AppDataSource.getRepository('User');
    const articleRepo = AppDataSource.getRepository('NewsArticle');
    const notifRepo = AppDataSource.getRepository('Notification');

    userRepo.find.mockResolvedValue([user]);
    articleRepo.find.mockResolvedValue([article]);
    notifRepo.findOneBy.mockResolvedValue(undefined);
    notifRepo.create.mockImplementation((obj) => obj);
    notifRepo.save.mockResolvedValue(undefined);

    await service.run();

    expect(MailService.send).toHaveBeenCalledWith(
      'user@example.com',
      expect.stringContaining('News Digest'),
      expect.stringContaining(article.title)
    );
  });
});
