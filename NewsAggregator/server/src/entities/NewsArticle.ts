import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { SavedArticle } from './SavedArticle';
import { Notification } from './Notification';

@Entity('news_articles')
export class NewsArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  source: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  external_id: string;

  @Column()
  category: string;

  // Relationships
  @OneToMany(() => SavedArticle, savedArticle => savedArticle.article)
  savedByUsers: SavedArticle[];

  @OneToMany(() => Notification, notification => notification.relatedArticle)
  notifications: Notification[];
}