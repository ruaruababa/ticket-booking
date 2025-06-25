"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const event_module_1 = require("./event.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(event_module_1.EventModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3006,
        },
    });
    await app.listen();
    console.log('Event Management Service is running on port 3006');
}
bootstrap();
//# sourceMappingURL=main.js.map