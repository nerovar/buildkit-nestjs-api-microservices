import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Mongo } from './persistence/interfaces/mongo.interface';
import { errorHandler } from './utility/error.handler';

@Injectable()
export class AppService {
  response = { code: 200, data: null, status: 'success', error: null };
  constructor(@InjectModel('MONGO') private mongoModel: Model<Mongo>) {}

  async getMongoData(req): Model<Mongo> {
    const data = req.body || req.params; // use this for db search query
    this.response['data'] = await this.mongoModel.find().exec();
    return this.response;
  }
}


