"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const notification_module_1 = require("./notification.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(notification_module_1.NotificationModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3004,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map