"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const booking_created_event_1 = require("../events/booking-created.event");
class Booking extends cqrs_1.AggregateRoot {
    constructor(id, userId, eventId) {
        super();
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.status = 'pending';
    }
    confirm() {
        this.status = 'confirmed';
    }
    cancel() {
        this.status = 'cancelled';
    }
    createBooking() {
        this.apply(new booking_created_event_1.BookingCreatedEvent(this.id, this.userId, this.eventId));
    }
}
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map