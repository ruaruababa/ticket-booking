import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking_tickets')
export class BookingTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'booking_id', type: 'int', nullable: false })
  bookingId: number;

  @Column({ name: 'ticket_type_id', type: 'int', nullable: false })
  ticketTypeId: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  unitPrice: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalPrice: number;
}
