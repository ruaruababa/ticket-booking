import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BookingModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BookingModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });
  await app.listen();
  console.log(`Booking Service is running on port 3002`);
}
bootstrap();
