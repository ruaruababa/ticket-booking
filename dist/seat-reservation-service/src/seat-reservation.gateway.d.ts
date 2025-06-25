import { RedisService } from '@liaoliaots/nestjs-redis';
import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SeatReservationGateway implements OnGatewayConnection {
    private readonly redisService;
    server: Server;
    private readonly logger;
    private readonly redis;
    constructor(redisService: RedisService);
    handleConnection(client: Socket): void;
    handleSelectSeat(data: {
        eventId: string;
        seatId: string;
    }, client: Socket): Promise<void>;
    handleReleaseSeat(data: {
        eventId: string;
        seatId: string;
    }, client: Socket): Promise<void>;
}
