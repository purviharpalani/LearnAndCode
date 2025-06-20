import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import "reflect-metadata";
import { ExternalServer } from './ExternalServer';

@Entity('api_request_logs')
export class ApiRequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  server_id: number;

  @Column()
  endpoint: string;

  @Column('text', { nullable: true })
  request_params: string;

  @Column()
  response_code: number;

  @Column('text', { nullable: true })
  response_body: string;

  @Column()
  request_time: number; // in milliseconds

  @Column({ nullable: true })
  error_message: string;

  @CreateDateColumn()
  created_at: Date;

  // Relationships
  @ManyToOne(() => ExternalServer, server => server.apiRequestLogs)
  @JoinColumn({ name: 'server_id' })
  server: ExternalServer;
}