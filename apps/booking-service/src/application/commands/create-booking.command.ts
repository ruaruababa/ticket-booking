import { CreateBookingDto } from '@app/common';

export class CreateBookingCommand {
  public readonly userId: string;
  public readonly eventId: string;
  public readonly seatIds: string[];

  constructor(
    public readonly bookingId: string,
    createBookingDto: CreateBookingDto,
  ) {
    this.userId = createBookingDto.userId;
    this.eventId = createBookingDto.eventId;
    this.seatIds = createBookingDto.seatIds;
  }
}
