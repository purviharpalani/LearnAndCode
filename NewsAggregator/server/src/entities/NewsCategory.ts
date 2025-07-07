import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NotificationPreference } from './NotificationPreferences';
import { NewsArticle } from './NewsArticle';

@Entity('news_categories')
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  is_hidden: boolean;

  @OneToMany(() => NotificationPreference, (pref) => pref.category)
  preferences: NotificationPreference[];

  @OneToMany(() => NewsArticle, (article) => article.categoryEntity)
  articles: NewsArticle[];
}
