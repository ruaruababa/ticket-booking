"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var QueueProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const queue_events_gateway_1 = require("./queue-events.gateway");
let QueueProcessor = QueueProcessor_1 = class QueueProcessor extends bullmq_1.WorkerHost {
    constructor(gateway) {
        super();
        this.gateway = gateway;
        this.logger = new common_1.Logger(QueueProcessor_1.name);
    }
    async process(job) {
        this.logger.log(`Processing job ${job.id} with data:`, job.data);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        this.logger.log(`Finished processing job ${job.id}`);
        return { result: `Job ${job.id} completed.` };
    }
    onCompleted(job) {
        this.logger.log(`Job ${job.id} has completed.`);
        if (job.data.userId) {
            this.gateway.sendQueueUpdate(job.data.userId, {
                status: 'completed',
                position: 0,
            });
        }
    }
    onActive(job) {
        this.logger.log(`Job ${job.id} has started.`);
        if (job.data.userId) {
            this.gateway.sendQueueUpdate(job.data.userId, {
                status: 'active',
                position: 1,
            });
        }
    }
};
exports.QueueProcessor = QueueProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "onCompleted", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "onActive", null);
exports.QueueProcessor = QueueProcessor = QueueProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('virtual-waiting-room'),
    __metadata("design:paramtypes", [queue_events_gateway_1.QueueEventsGateway])
], QueueProcessor);
//# sourceMappingURL=queue.processor.js.map