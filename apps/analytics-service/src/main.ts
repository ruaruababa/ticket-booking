import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AnalyticsModule);
  console.log('Analytics Service is running...');
}
bootstrap();
