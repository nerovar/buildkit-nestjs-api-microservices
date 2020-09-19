import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.SECURITY_QUEUE
    }
  });
  app.listen(() => Logger.log('Security Service is listening'));
}
bootstrap();
