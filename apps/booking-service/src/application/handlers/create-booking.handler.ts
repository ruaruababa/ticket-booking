import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Booking } from '../../domain/entities/booking.entity';
import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '../../domain/repositories/booking.repository';
import { CreateBookingCommand } from '../commands/create-booking.command';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly repository: BookingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateBookingCommand): Promise<any> {
    const { bookingId, userId, eventId } = command;

    // Create a new booking aggregate
    const booking = this.publisher.mergeObjectContext(
      new Booking(bookingId, userId, eventId),
    );

    // Here you would typically have more business logic, validation, etc.

    // This is where event sourcing comes in.
    // The createBooking method on the aggregate applies the BookingCreatedEvent.
    booking.createBooking();

    // The repository saves the aggregate and its uncommitted events.
    await this.repository.save(booking);

    // The events are then published to be handled by sagas or other event handlers.
    booking.commit();

    return { bookingId };
  }
}
