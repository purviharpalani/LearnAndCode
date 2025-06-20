import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { UserSession } from './UserSession';
import { SavedArticle } from './SavedArticle';
import { EmailLog } from './EmailLog';
import { SearchHistory } from './SearchHistory';
import { NotificationConfig } from './NotificationConfig';
import { Notification } from './Notification';
// Users Entity
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

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: true })
  is_active: boolean;

  // Relationships
  @OneToMany(() => UserSession, userSession => userSession.user)
  sessions: UserSession[];

  @OneToMany(() => SavedArticle, savedArticle => savedArticle.user)
  savedArticles: SavedArticle[];

  @OneToMany(() => EmailLog, emailLog => emailLog.user)
  emailLogs: EmailLog[];

  @OneToMany(() => SearchHistory, searchHistory => searchHistory.user)
  searchHistory: SearchHistory[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => NotificationConfig, notificationConfig => notificationConfig.user)
  notificationConfigs: NotificationConfig[];
}

export default User;
