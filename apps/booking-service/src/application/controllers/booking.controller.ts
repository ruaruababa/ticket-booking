import { CreateBookingDto } from '@app/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CreateBookingCommand } from '../commands/create-booking.command';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<any> {
    const bookingId = randomUUID();
    return this.commandBus.execute(
      new CreateBookingCommand(bookingId, createBookingDto),
    );
  }
}
