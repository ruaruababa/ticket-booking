export declare class BookingCreatedEvent {
    readonly bookingId: string;
    readonly userId: string;
    readonly eventId: string;
    constructor(bookingId: string, userId: string, eventId: string);
}
