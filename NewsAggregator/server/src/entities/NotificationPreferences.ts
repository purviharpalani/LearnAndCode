import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity('notification_preferences')
export class NotificationPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  keywords: string;

  @Column({ default: true })
  enabled: boolean;

  @ManyToOne(() => User, user => user.notificationPreferences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
