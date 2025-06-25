import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SeatReservationModule } from './seat-reservation.module';

async function bootstrap() {
  const app = await NestFactory.create(SeatReservationModule);

  // Use the IoAdapter for websockets
  app.useWebSocketAdapter(new IoAdapter(app));

  // Connect it as a microservice
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3007,
    },
  });

  await app.startAllMicroservices();
  await app.listen(8888); // Expose a port for WebSocket connections
  console.log('Seat Reservation Service is running on port 8888');
  console.log('Seat Reservation Microservice is running on port 3007');
}
bootstrap();
