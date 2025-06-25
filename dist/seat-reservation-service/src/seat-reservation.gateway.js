"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeatReservationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatReservationGateway = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let SeatReservationGateway = SeatReservationGateway_1 = class SeatReservationGateway {
    constructor(redisService) {
        this.redisService = redisService;
        this.logger = new common_1.Logger(SeatReservationGateway_1.name);
        this.redis = this.redisService.getOrThrow();
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    async handleSelectSeat(data, client) {
        const lockKey = `seat:${data.eventId}:${data.seatId}`;
        const lock = await this.redis.set(lockKey, client.id, 'EX', 60, 'NX');
        if (lock) {
            this.logger.log(`Client ${client.id} locked seat ${data.seatId}`);
            client.broadcast.emit('seatTaken', data);
            client.emit('seatSelected', { success: true, ...data });
        }
        else {
            this.logger.warn(`Seat ${data.seatId} is already locked.`);
            client.emit('seatSelected', { success: false, ...data });
        }
    }
    async handleReleaseSeat(data, client) {
        const lockKey = `seat:${data.eventId}:${data.seatId}`;
        const lockHolder = await this.redis.get(lockKey);
        if (lockHolder === client.id) {
            await this.redis.del(lockKey);
            this.logger.log(`Client ${client.id} released seat ${data.seatId}`);
            this.server.emit('seatReleased', data);
        }
    }
};
exports.SeatReservationGateway = SeatReservationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SeatReservationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('selectSeat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SeatReservationGateway.prototype, "handleSelectSeat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('releaseSeat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SeatReservationGateway.prototype, "handleReleaseSeat", null);
exports.SeatReservationGateway = SeatReservationGateway = SeatReservationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(8888, {
        cors: { origin: '*' },
        transports: ['websocket'],
    }),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], SeatReservationGateway);
//# sourceMappingURL=seat-reservation.gateway.js.map