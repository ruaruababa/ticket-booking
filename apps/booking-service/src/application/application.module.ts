import { Module, Provider, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookingController } from './controllers/booking.controller';
import { CreateBookingHandler } from './handlers/create-booking.handler';
import { BookingSaga } from './sagas/booking.saga';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const CommandHandlers: Provider[] = [CreateBookingHandler];
const QueryHandlers: Provider[] = [];
const Sagas: Type<any>[] = [BookingSaga];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  controllers: [BookingController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Sagas],
})
export class ApplicationModule {}
