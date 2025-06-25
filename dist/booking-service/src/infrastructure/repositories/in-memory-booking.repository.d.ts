import { Booking } from '../../domain/entities/booking.entity';
import { BookingRepository } from '../../domain/repositories/booking.repository';
export declare class InMemoryBookingRepository implements BookingRepository {
    private readonly bookings;
    findById(id: string): Promise<Booking | null>;
    save(booking: Booking): Promise<void>;
}
