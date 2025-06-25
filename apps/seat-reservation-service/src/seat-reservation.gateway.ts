import { RedisService } from '@liaoliaots/nestjs-redis';
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Redis } from 'ioredis';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8888, {
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class SeatReservationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SeatReservationGateway.name);
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('selectSeat')
  async handleSelectSeat(
    @MessageBody() data: { eventId: string; seatId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const lockKey = `seat:${data.eventId}:${data.seatId}`;
    const lock = await this.redis.set(lockKey, client.id, 'EX', 60, 'NX');

    if (lock) {
      this.logger.log(`Client ${client.id} locked seat ${data.seatId}`);
      // Notify all other clients that the seat is taken
      client.broadcast.emit('seatTaken', data);
      // Confirm lock to the client
      client.emit('seatSelected', { success: true, ...data });
    } else {
      this.logger.warn(`Seat ${data.seatId} is already locked.`);
      client.emit('seatSelected', { success: false, ...data });
    }
  }

  @SubscribeMessage('releaseSeat')
  async handleReleaseSeat(
    @MessageBody() data: { eventId: string; seatId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const lockKey = `seat:${data.eventId}:${data.seatId}`;
    // Ensure only the client who locked the seat can release it
    const lockHolder = await this.redis.get(lockKey);
    if (lockHolder === client.id) {
      await this.redis.del(lockKey);
      this.logger.log(`Client ${client.id} released seat ${data.seatId}`);
      this.server.emit('seatReleased', data); // Notify all clients
    }
  }
}
