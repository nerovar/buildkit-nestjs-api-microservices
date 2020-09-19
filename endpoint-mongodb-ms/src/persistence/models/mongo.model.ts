import { MongooseModule } from "@nestjs/mongoose";

import * as mongoose from 'mongoose';

export const MongoSchema = new mongoose.Schema({
    data: String
}, { collection: 'mongo' })
