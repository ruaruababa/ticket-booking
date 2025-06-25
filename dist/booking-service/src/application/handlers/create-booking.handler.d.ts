import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookingRepository } from '../../domain/repositories/booking.repository';
import { CreateBookingCommand } from '../commands/create-booking.command';
export declare class CreateBookingHandler implements ICommandHandler<CreateBookingCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: BookingRepository, publisher: EventPublisher);
    execute(command: CreateBookingCommand): Promise<any>;
}
