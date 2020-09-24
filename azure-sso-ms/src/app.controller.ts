import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sso'})
  async azureSso(req: any) {
    return await this.appService.azureLogin(req);
  }
}
