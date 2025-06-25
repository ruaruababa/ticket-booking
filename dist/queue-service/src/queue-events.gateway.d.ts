import { Server, Socket } from 'socket.io';
export declare class QueueEventsGateway {
    server: Server;
    private logger;
    sendQueueUpdate(userId: string, payload: {
        status: string;
        position: number;
    }): void;
    handleJoinRoom(client: Socket): void;
}
