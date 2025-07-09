import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn
} from 'typeorm';
import { User } from './User';
import { NewsArticle } from './NewsArticle';

@Entity('saved_articles')
export class SavedArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  article_id: number;

  @ManyToOne(() => User, user => user.savedArticles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => NewsArticle)
  @JoinColumn({ name: 'article_id' })
  article: NewsArticle;
}
