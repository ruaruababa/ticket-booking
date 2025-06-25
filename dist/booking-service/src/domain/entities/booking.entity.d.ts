import { AggregateRoot } from '@nestjs/cqrs';
export declare class Booking extends AggregateRoot {
    id: string;
    userId: string;
    eventId: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    constructor(id: string, userId: string, eventId: string);
    confirm(): void;
    cancel(): void;
    createBooking(): void;
}
