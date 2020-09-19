import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  // app.use(cors);
  // app.use(helmet);
  await app.listen(process.env.port || 3000);
}
bootstrap();
