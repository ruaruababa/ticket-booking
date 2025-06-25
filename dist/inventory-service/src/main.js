"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const inventory_module_1 = require("./inventory.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(inventory_module_1.InventoryModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3005,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map