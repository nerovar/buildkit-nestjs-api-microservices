import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-mongo-data'})
  async azureSso(data: any) {
    const { code } = data;
    return await this.appService.azureLogin(code);
  }
}
