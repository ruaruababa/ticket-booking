import { Booking } from '../entities/booking.entity';
export declare const BOOKING_REPOSITORY: unique symbol;
export interface BookingRepository {
    findById(id: string): Promise<Booking | null>;
    save(booking: Booking): Promise<void>;
}
