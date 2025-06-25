"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ticket Booking API')
        .setDescription('The API documentation for the Ticket Booking System')
        .setVersion('1.0')
        .addTag('bookings')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3001);
    console.log(`API Gateway is running on: ${await app.getUrl()}`);
    console.log(`Swagger Docs available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map