import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { ExternalServer } from './ExternalServer';

@Entity('api_request_logs')
export class ApiRequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  server_id: number;

  @Column()
  endpoint: string;

  @Column()
  request_params: string;

  @Column()
  response_code: number;

  @Column()
  response_body: string;

  @Column()
  request_time: number; // in ms

  @Column({ nullable: true })
  error_message: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ExternalServer)
  @JoinColumn({ name: 'server_id' })
  server: ExternalServer;
}
