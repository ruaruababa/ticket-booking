import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });

  // Enable CORS
  app.enableCors();

  // Add Helmet for security headers
  app.use(helmet());

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Setup Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Ticket Booking API')
    .setDescription('The API documentation for the Ticket Booking System')
    .setVersion('1.0')
    .addTag('bookings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001);
  console.log(`API Gateway is running on: ${await app.getUrl()}`);
  console.log(`Swagger Docs available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
