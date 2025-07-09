import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn
} from 'typeorm';
import { UserSession, SavedArticle, EmailLog, SearchHistory, Notification, ArticleReaction, NotificationPreference, ArticleReport} from './index';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column()
  password_hash: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => UserSession, session => session.user)
  sessions: UserSession[];

  @OneToMany(() => SavedArticle, saved => saved.user)
  savedArticles: SavedArticle[];

  @OneToMany(() => EmailLog, emailLog => emailLog.user)
  emailLogs: EmailLog[];

  @OneToMany(() => SearchHistory, sh => sh.user)
  searchHistory: SearchHistory[];

  @OneToMany(() => Notification, n => n.user)
  notifications: Notification[];

  @OneToMany(() => ArticleReaction, r => r.user)
  reactions: ArticleReaction[];

  @OneToMany(() => NotificationPreference, p => p.user)
  notificationPreferences: NotificationPreference[];

  @OneToMany(() => ArticleReport, (report) => report.user)
  reports: ArticleReport[];
}
