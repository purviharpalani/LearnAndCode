import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
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
  searched_at: Date;

  // Relationships
  @ManyToOne(() => User, user => user.searchHistory)
  @JoinColumn({ name: 'user_id' })
  user: User;
}