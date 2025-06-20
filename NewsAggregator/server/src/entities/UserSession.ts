import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { User } from './User';

@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  session_token: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column({ default: true })
  is_active: boolean;

  // Relationships
  @ManyToOne(() => User, user => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
