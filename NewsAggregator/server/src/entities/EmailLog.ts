import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity('email_logs')
export class EmailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  subject: string;

  @Column()
  content: string;

  @Column()
  status: 'sent' | 'failed';

  @Column({ nullable: true })
  error_message: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.emailLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
