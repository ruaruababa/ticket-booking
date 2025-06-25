import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationGateway');

  // Method to send a push notification to a specific user
  sendPushNotification(
    userId: string,
    payload: { title: string; message: string },
  ) {
    this.logger.log(`Sending push notification to user ${userId}`);
    // This assumes the client joins a room named after their userId
    this.server.to(`user-${userId}`).emit('pushNotification', payload);
  }
}
