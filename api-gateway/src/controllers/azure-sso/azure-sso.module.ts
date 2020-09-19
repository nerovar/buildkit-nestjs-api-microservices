import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { AzureSsoTransport } from "src/config/amqp-services";
import { AzureSsoController } from "./azure-sso.controller";
import { AzureSsoService } from "./azure-sso.service";

@Module({
    imports: [
        ClientsModule.registerAsync([{
            name: 'AZURE_SSO',
            useClass: AzureSsoTransport
        }])
    ],
    controllers: [AzureSsoController],
    providers: [AzureSsoService],
    exports: [AzureSsoService]

})
export class AzureSsoModule {}