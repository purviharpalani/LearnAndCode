import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { User } from './User';
import { NewsArticle } from './NewsArticle';

@Entity('article_reactions')
@Unique(['user', 'article'])
export class ArticleReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'like' | 'dislike';

  @ManyToOne(() => User, user => user.reactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => NewsArticle)
  @JoinColumn({ name: 'article_id' })
  article: NewsArticle;
}
