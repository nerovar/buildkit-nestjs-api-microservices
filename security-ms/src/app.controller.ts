import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';

import { getJwksKey, validateToken } from './utility/validate-token.util';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'security-auth-guard'})
  async authGuard(data: any) {
    const response = {};
    const idToken: any = await new Promise((resolve) => {
      jwt.verify(data.token, getJwksKey, (err, decoded) => {
        resolve(decoded);
      });
    });
    if (!validateToken(idToken)) {
      response['status'] = 'failed';
      return response;
    }
    response['status'] = 'authenticated';
    return response;
  }
}
