import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello gg!';
  }

  // @Cron(CronExpression.EVERY_SECOND)
  // handleCron() {
  //   console.log('cmm is running');
  // }
}
