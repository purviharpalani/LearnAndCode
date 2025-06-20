import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { User } from './User';

@Entity('email_logs')
export class EmailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  error_message: string;

  @CreateDateColumn()
  sent_at: Date;

  // Relationships
  @ManyToOne(() => User, user => user.emailLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
