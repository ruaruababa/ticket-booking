"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const payment_module_1 = require("./payment.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(payment_module_1.PaymentModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3003,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map