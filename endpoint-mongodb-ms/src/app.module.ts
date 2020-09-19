import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfig } from './config/mongo.config';
import { MongoSchema } from './persistence/models/mongo.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfig
    }),
    MongooseModule.forFeature([{
      name: 'MONGO', schema: MongoSchema
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
