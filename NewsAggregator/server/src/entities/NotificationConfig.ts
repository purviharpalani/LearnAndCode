import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { User } from './User';

@Entity('notification_config')
export class NotificationConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  category: string;

  @Column({ default: true })
  is_enabled: boolean;

  @Column('text', { nullable: true })
  keywords: string; // JSON string or comma-separated values

  // Relationships
  @ManyToOne(() => User, user => user.notificationConfigs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}