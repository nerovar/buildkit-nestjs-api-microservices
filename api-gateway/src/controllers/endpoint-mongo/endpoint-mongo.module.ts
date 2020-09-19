import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { EndpointMongoTransport } from "src/config/amqp-services";
import { SecurityModule } from "src/shared-services/security/security.module";
import { SecurityService } from "src/shared-services/security/security.service";
import { EndpointMongoController } from "./endpoint-mongo.controller";
import { EndpointMongoService } from "./endpoint-mongo.service";

@Module({
    imports: [
        ClientsModule.registerAsync([{
            name: 'ENDPOINT_MONGO',
            useClass: EndpointMongoTransport
        }]),
        SecurityModule
    ],
    controllers: [EndpointMongoController],
    providers: [EndpointMongoService, SecurityService],
    exports: [EndpointMongoService]

})
export class EndpointMongoModule {}