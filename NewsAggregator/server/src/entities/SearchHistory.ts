import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity('search_history')
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  search_query: string;

  @Column()
  results_count: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.searchHistory)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
