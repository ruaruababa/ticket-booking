import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { EventModule } from './event.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EventModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3006,
    },
  });
  await app.listen();
  console.log('Event Management Service is running on port 3006');
}
bootstrap();
