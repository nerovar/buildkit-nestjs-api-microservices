import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: "mongodb://localhost:27017/buildkit-nestjs",
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}