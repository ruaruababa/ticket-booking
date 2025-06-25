import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3004,
    },
  });
  await app.listen();
}
bootstrap();
