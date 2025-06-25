"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const queue_module_1 = require("./queue.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(queue_module_1.QueueModule);
    console.log('Queue Management Service is running...');
}
bootstrap();
//# sourceMappingURL=main.js.map