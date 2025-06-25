import { RedisModule } from '@liaoliaots/nestjs-redis';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { BookingEventsGateway } from './infrastructure/gateways/booking-events.gateway';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
    }),
    // Example for a specific queue
    BullModule.registerQueue({
      name: 'booking-jobs',
    }),
  ],
  providers: [BookingEventsGateway],
})
export class BookingModule {}
