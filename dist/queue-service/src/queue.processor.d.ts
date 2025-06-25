import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueEventsGateway } from './queue-events.gateway';
export declare class QueueProcessor extends WorkerHost {
    private readonly gateway;
    private readonly logger;
    constructor(gateway: QueueEventsGateway);
    process(job: Job<any, any, string>): Promise<any>;
    onCompleted(job: Job<any>): void;
    onActive(job: Job<any>): void;
}
