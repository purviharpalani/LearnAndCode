import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';

import { NewsCategory } from './NewsCategory';

@Entity('news_articles')
export class NewsArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, length: 1000 })
  description: string;

  @Column()
  url: string;

  @Column()
  source: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => NewsCategory, category => category.articles)
  @JoinColumn({ name: 'category_id' })
  categoryEntity: NewsCategory;

  @Column({ name: 'category_id' })
  categoryId: number;

}
