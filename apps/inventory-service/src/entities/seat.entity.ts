import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SeatType {
  REGULAR = 'regular',
  VIP = 'vip',
  PREMIUM = 'premium',
}

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'venue_id', type: 'int', nullable: false })
  venueId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  section: string;

  @Column({ name: 'row_number', type: 'varchar', length: 10, nullable: true })
  rowNumber: string;

  @Column({ name: 'seat_number', type: 'varchar', length: 10, nullable: true })
  seatNumber: string;

  @Column({
    name: 'seat_type',
    type: 'enum',
    enum: SeatType,
    default: SeatType.REGULAR,
  })
  seatType: SeatType;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;
}
