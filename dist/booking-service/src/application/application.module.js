"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const booking_controller_1 = require("./controllers/booking.controller");
const create_booking_handler_1 = require("./handlers/create-booking.handler");
const booking_saga_1 = require("./sagas/booking.saga");
const infrastructure_module_1 = require("../infrastructure/infrastructure.module");
const CommandHandlers = [create_booking_handler_1.CreateBookingHandler];
const QueryHandlers = [];
const Sagas = [booking_saga_1.BookingSaga];
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, infrastructure_module_1.InfrastructureModule],
        controllers: [booking_controller_1.BookingController],
        providers: [...CommandHandlers, ...QueryHandlers, ...Sagas],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map