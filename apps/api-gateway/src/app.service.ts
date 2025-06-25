import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  getHello(): string {
    this.logger.log('Client requested the "Hello" endpoint.', AppService.name);
    return 'Hello From API Gateway!';
  }
}
