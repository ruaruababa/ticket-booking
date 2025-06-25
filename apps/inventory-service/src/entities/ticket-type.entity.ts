import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ticket_types')
export class TicketType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_id', type: 'int', nullable: false })
  eventId: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ name: 'sold_count', type: 'int', default: 0 })
  soldCount: number;

  @Column({ name: 'sale_start', type: 'timestamp', nullable: true })
  saleStart: Date;

  @Column({ name: 'sale_end', type: 'timestamp', nullable: true })
  saleEnd: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
