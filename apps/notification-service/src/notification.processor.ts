import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'send-email':
        const { to, subject, template, context } = job.data;
        try {
          await this.mailerService.sendMail({
            to,
            subject,
            template, // The name of the hbs file
            context, // The variables to pass to the template
          });
          this.logger.log(`Email sent successfully to ${to}`);
        } catch (error) {
          this.logger.error(`Failed to send email to ${to}`, error.stack);
          throw error; // Throw error to let BullMQ handle retry
        }
        break;
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
        break;
    }
  }
}
