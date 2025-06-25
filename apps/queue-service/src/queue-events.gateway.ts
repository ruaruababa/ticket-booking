import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QueueEventsGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('QueueEventsGateway');

  // Method to send updates to a specific user
  sendQueueUpdate(
    userId: string,
    payload: { status: string; position: number },
  ) {
    this.logger.log(`Sending queue update to user ${userId}`);
    // This assumes the client joins a room named after their userId
    this.server.to(userId).emit('queueUpdate', payload);
  }

  // Allow clients to join a room based on their userId
  @SubscribeMessage('joinQueueRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket) {
    // In a real app, you'd get the userId from an auth token
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(userId);
      this.logger.log(`Client ${client.id} joined room for user ${userId}`);
    }
  }
}
