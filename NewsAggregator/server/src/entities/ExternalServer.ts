import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { ApiRequestLog } from './ApiRequestLog';

@Entity('external_servers')
export class ExternalServer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  api_key: string;

  @Column()
  base_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  last_accessed: Date;

  @Column({ nullable: true })
  request_limit: number;

  @Column({ default: 0 })
  requests_made: number;

  @CreateDateColumn()
  created_at: Date;

  // Relationships
  @OneToMany(() => ApiRequestLog, apiRequestLog => apiRequestLog.server)
  apiRequestLogs: ApiRequestLog[];
}