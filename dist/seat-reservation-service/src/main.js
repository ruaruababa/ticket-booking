"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const seat_reservation_module_1 = require("./seat-reservation.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(seat_reservation_module_1.SeatReservationModule);
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3007,
        },
    });
    await app.startAllMicroservices();
    await app.listen(8888);
    console.log('Seat Reservation Service is running on port 8888');
    console.log('Seat Reservation Microservice is running on port 3007');
}
bootstrap();
//# sourceMappingURL=main.js.map