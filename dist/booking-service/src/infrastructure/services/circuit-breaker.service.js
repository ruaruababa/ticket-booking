"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CircuitBreakerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreakerService = void 0;
const common_1 = require("@nestjs/common");
var CircuitBreakerState;
(function (CircuitBreakerState) {
    CircuitBreakerState[CircuitBreakerState["CLOSED"] = 0] = "CLOSED";
    CircuitBreakerState[CircuitBreakerState["OPEN"] = 1] = "OPEN";
    CircuitBreakerState[CircuitBreakerState["HALF_OPEN"] = 2] = "HALF_OPEN";
})(CircuitBreakerState || (CircuitBreakerState = {}));
let CircuitBreakerService = CircuitBreakerService_1 = class CircuitBreakerService {
    constructor() {
        this.logger = new common_1.Logger(CircuitBreakerService_1.name);
        this.state = CircuitBreakerState.CLOSED;
        this.failures = 0;
        this.failureThreshold = 3;
        this.resetTimeout = 10000;
    }
    async execute(fn) {
        if (this.state === CircuitBreakerState.OPEN) {
            this.logger.error('Circuit is OPEN. Call blocked.');
            throw new Error('CircuitBreakerIsOpen');
        }
        try {
            const result = await fn();
            this.reset();
            return result;
        }
        catch (error) {
            this.recordFailure();
            throw error;
        }
    }
    recordFailure() {
        this.failures++;
        this.logger.warn(`Failure ${this.failures} recorded.`);
        if (this.failures >= this.failureThreshold) {
            this.trip();
        }
    }
    trip() {
        this.logger.error('Failure threshold reached. Tripping the circuit to OPEN.');
        this.state = CircuitBreakerState.OPEN;
        setTimeout(() => this.halfOpen(), this.resetTimeout);
    }
    halfOpen() {
        this.logger.log('Reset timeout elapsed. Setting circuit to HALF_OPEN.');
        this.state = CircuitBreakerState.HALF_OPEN;
    }
    reset() {
        if (this.state !== CircuitBreakerState.CLOSED) {
            this.logger.log('Call successful. Resetting circuit to CLOSED.');
            this.failures = 0;
            this.state = CircuitBreakerState.CLOSED;
        }
    }
};
exports.CircuitBreakerService = CircuitBreakerService;
exports.CircuitBreakerService = CircuitBreakerService = CircuitBreakerService_1 = __decorate([
    (0, common_1.Injectable)()
], CircuitBreakerService);
//# sourceMappingURL=circuit-breaker.service.js.map