import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

interface UserService {
  findOneUser(data: { id: number }): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(
    private readonly appService: AppService,
    @InjectMetric('hello_requests_total')
    private readonly helloCounter: Counter<string>,
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getHello(): string {
    this.helloCounter.inc();
    return this.appService.getHello();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOneUser({ id: +id });
  }
}
