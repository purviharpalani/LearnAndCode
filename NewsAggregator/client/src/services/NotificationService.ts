// client/services/NotificationService.ts
import { httpClient } from '../utils/httpClient';
import { Notification, NotificationPreference } from './types';

export class NotificationService {
  static async fetchNotifications(userId: number): Promise<Notification[]> {
    const res = await httpClient.get(`/notifications/${userId}`);
    return res.data;
  }

  static async getPreferences(userId: number): Promise<NotificationPreference[]> {
    const res = await httpClient.get(`/notifications/preferences/${userId}`);
    return res.data;
  }

  static async toggleCategory(userId: number, categoryIndex: number): Promise<void> {
    const categoryMap = {
      1: 'business',
      2: 'entertainment',
      3: 'sports',
      4: 'technology',
    } as const;

    const category = categoryMap[categoryIndex as keyof typeof categoryMap];
    if (!category) throw new Error('Invalid category index');

    await httpClient.patch(`/notifications/preferences/${userId}/toggle`, { category });
  }

  static async setKeywords(userId: number, keywords: string[]): Promise<void> {
    await httpClient.patch(`/notifications/preferences/${userId}/keywords`, { keywords });
  }
}
