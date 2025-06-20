import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { User } from './User';
import { NewsArticle } from './NewsArticle';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  related_article_id: number;

  // Relationships
  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => NewsArticle, article => article.notifications, { nullable: true })
  @JoinColumn({ name: 'related_article_id' })
  relatedArticle: NewsArticle;
}