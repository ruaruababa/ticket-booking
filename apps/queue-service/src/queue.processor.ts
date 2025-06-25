import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QueueEventsGateway } from './queue-events.gateway';

@Processor('virtual-waiting-room')
export class QueueProcessor extends WorkerHost {
  private readonly logger = new Logger(QueueProcessor.name);

  constructor(private readonly gateway: QueueEventsGateway) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} with data:`, job.data);
    // In a real app, you might use job.name to handle different types of jobs
    // switch (job.name) {
    //   case 'some-job-name':
    //     // ... do something
    //     break;
    //   default:
    //     break;
    // }

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.logger.log(`Finished processing job ${job.id}`);
    return { result: `Job ${job.id} completed.` };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any>) {
    this.logger.log(`Job ${job.id} has completed.`);
    if (job.data.userId) {
      this.gateway.sendQueueUpdate(job.data.userId, {
        status: 'completed',
        position: 0,
      });
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job<any>) {
    this.logger.log(`Job ${job.id} has started.`);
    if (job.data.userId) {
      this.gateway.sendQueueUpdate(job.data.userId, {
        status: 'active',
        position: 1, // Example position
      });
    }
  }
}
