"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const booking_module_1 = require("./booking.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(booking_module_1.BookingModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3002,
        },
    });
    await app.listen();
    console.log(`Booking Service is running on port 3002`);
}
bootstrap();
//# sourceMappingURL=main.js.map