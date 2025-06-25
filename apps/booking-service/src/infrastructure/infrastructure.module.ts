import { Module, Provider } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { BOOKING_REPOSITORY } from '../domain/repositories/booking.repository';
import { InMemoryBookingRepository } from './repositories/in-memory-booking.repository';
import { CircuitBreakerService } from './services/circuit-breaker.service';
import { DistributedLockService } from './services/distributed-lock.service';

// Import your repository implementations here
// e.g. import { BookingRepositoryImpl } from './repositories/booking.repository.impl';

// Provide your repository implementations here
const Repositories: Provider[] = [
  {
    provide: BOOKING_REPOSITORY,
    useClass: InMemoryBookingRepository,
  },
  // {
  //   provide: 'BookingRepository', // Use a token
  //   useClass: BookingRepositoryImpl,
  // },
];

const Services: Provider[] = [DistributedLockService, CircuitBreakerService];

@Module({
  imports: [DomainModule],
  providers: [
    ...Repositories,
    ...Services,
    // Add other infrastructure services like DistributedLockService here
  ],
  exports: [
    ...Repositories,
    ...Services,
    // Export other services if needed by other modules
  ],
})
export class InfrastructureModule {}
