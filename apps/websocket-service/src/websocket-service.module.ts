import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { WebsocketServiceController } from './websocket-service.controller';
import { WebsocketServiceService } from './websocket-service.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [WebsocketServiceController],
  providers: [WebsocketServiceService, WebsocketGateway],
})
export class WebsocketServiceModule {}
