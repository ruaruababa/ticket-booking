import { AggregateRoot } from '@nestjs/cqrs';
import { BookingCreatedEvent } from '../events/booking-created.event';

export class Booking extends AggregateRoot {
  id: string;
  userId: string;
  eventId: string;
  status: 'pending' | 'confirmed' | 'cancelled';

  constructor(id: string, userId: string, eventId: string) {
    super();
    this.id = id;
    this.userId = userId;
    this.eventId = eventId;
    this.status = 'pending';
  }

  confirm() {
    this.status = 'confirmed';
    // More domain events can be applied here
  }

  cancel() {
    this.status = 'cancelled';
  }

  createBooking() {
    // Logic to apply the event
    this.apply(new BookingCreatedEvent(this.id, this.userId, this.eventId));
  }
}
