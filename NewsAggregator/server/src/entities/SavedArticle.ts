import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
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

  @CreateDateColumn()
  saved_at: Date;

  // Relationships
  @ManyToOne(() => User, user => user.savedArticles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => NewsArticle, article => article.savedByUsers)
  @JoinColumn({ name: 'article_id' })
  article: NewsArticle;
}
