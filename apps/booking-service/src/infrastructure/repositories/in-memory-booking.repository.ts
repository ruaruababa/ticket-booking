import { Injectable } from '@nestjs/common';
import { Booking } from '../../domain/entities/booking.entity';
import { BookingRepository } from '../../domain/repositories/booking.repository';

@Injectable()
export class InMemoryBookingRepository implements BookingRepository {
  private readonly bookings: Map<string, Booking> = new Map();

  async findById(id: string): Promise<Booking | null> {
    const booking = this.bookings.get(id);
    return booking || null;
  }

  async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking);
  }
}
