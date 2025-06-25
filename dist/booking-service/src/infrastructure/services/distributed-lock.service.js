"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DistributedLockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedLockService = void 0;
const common_1 = require("@nestjs/common");
let DistributedLockService = DistributedLockService_1 = class DistributedLockService {
    constructor() {
        this.logger = new common_1.Logger(DistributedLockService_1.name);
        this.locks = new Set();
    }
    async acquire(key, timeout = 5000) {
        this.logger.log(`Attempting to acquire lock for key: ${key}`);
        if (this.locks.has(key)) {
            this.logger.warn(`Lock for key ${key} is already held.`);
            return false;
        }
        this.locks.add(key);
        this.logger.log(`Lock acquired for key: ${key}`);
        return true;
    }
    async release(key) {
        if (this.locks.has(key)) {
            this.locks.delete(key);
            this.logger.log(`Lock released for key: ${key}`);
        }
    }
};
exports.DistributedLockService = DistributedLockService;
exports.DistributedLockService = DistributedLockService = DistributedLockService_1 = __decorate([
    (0, common_1.Injectable)()
], DistributedLockService);
//# sourceMappingURL=distributed-lock.service.js.map