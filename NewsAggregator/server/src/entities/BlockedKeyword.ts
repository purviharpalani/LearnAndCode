import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blocked_keywords')
export class BlockedKeyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;
}