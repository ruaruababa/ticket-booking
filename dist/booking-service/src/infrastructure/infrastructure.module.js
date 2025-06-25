"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const domain_module_1 = require("../domain/domain.module");
const booking_repository_1 = require("../domain/repositories/booking.repository");
const in_memory_booking_repository_1 = require("./repositories/in-memory-booking.repository");
const circuit_breaker_service_1 = require("./services/circuit-breaker.service");
const distributed_lock_service_1 = require("./services/distributed-lock.service");
const Repositories = [
    {
        provide: booking_repository_1.BOOKING_REPOSITORY,
        useClass: in_memory_booking_repository_1.InMemoryBookingRepository,
    },
];
const Services = [distributed_lock_service_1.DistributedLockService, circuit_breaker_service_1.CircuitBreakerService];
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [domain_module_1.DomainModule],
        providers: [
            ...Repositories,
            ...Services,
        ],
        exports: [
            ...Repositories,
            ...Services,
        ],
    })
], InfrastructureModule);
//# sourceMappingURL=infrastructure.module.js.map