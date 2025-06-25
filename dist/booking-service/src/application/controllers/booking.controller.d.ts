import { CommandBus, QueryBus } from '@nestjs/cqrs';
export declare class BookingController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createBooking(createBookingDto: any): Promise<any>;
    getBookingById(id: string): Promise<any>;
}
