"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const user_module_1 = require("./user.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_module_1.UserModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3002,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map