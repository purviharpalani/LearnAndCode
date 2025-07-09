import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { NewsArticle } from './NewsArticle';
import { User } from './User';

@Entity('article_reports')
export class ArticleReport {
  @PrimaryGeneratedColumn()
  id: number;

//   @ManyToOne(() => NewsArticle)
//   @JoinColumn({ name: 'article_id' })
//   article: NewsArticle;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'user_id' })
//   user: User;
  @ManyToOne(() => NewsArticle, (article) => article.reports, { onDelete: 'CASCADE' })
  article: NewsArticle;

  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  reason: string;

  @CreateDateColumn()
  reported_at: Date;
}
