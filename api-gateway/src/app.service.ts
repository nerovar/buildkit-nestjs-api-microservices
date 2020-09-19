import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiHealthCheck(): string {
    return 'Health Check Goes Here!';
  }
}
