import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new Logger('UserService');

  // Create the microservice
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../../../libs/common/src/proto/user.proto'),
        url: '0.0.0.0:50051', // This should be configurable via environment variables
      },
    },
  );

  await app.listen();
  logger.log('User gRPC microservice is running on port 50051');
}

bootstrap();
