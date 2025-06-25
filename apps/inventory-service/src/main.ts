import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(InventoryModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3005,
    },
  });
  await app.listen();
}
bootstrap();
