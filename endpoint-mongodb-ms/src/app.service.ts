import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Mongo } from './persistence/interfaces/mongo.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('MONGO') private mongoModel: Model<Mongo>) {}
  async getMongoData(): Model<Mongo> {
    return await this.mongoModel.find().exec();
  }
}
