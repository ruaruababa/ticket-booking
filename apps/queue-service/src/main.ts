import { NestFactory } from '@nestjs/core';
import { QueueModule } from './queue.module';

async function bootstrap() {
  // Create a standalone application context
  const app = await NestFactory.createApplicationContext(QueueModule);
  console.log('Queue Management Service is running...');
}
bootstrap();
