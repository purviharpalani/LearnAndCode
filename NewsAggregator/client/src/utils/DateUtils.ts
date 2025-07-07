// src/utils/DateUtils.ts

export class DateUtils {
  static getCurrentFormattedDate(): string {
    return new Date().toLocaleDateString('en-GB');
  }

  static getCurrentFormattedTime(): string {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  static getCurrentDetailedDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  static getCurrentDetailedTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  static getCurrentDateTimeForHeadlines(): { date: string; time: string } {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
  }
}
