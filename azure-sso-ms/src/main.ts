import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.AZURE_SSO_QUEUE
    }
  });
  app.listen(() => Logger.log('Azure SSO Service is listening'));
}
bootstrap();
