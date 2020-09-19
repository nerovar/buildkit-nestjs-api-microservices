import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { SecurityTransport } from "src/config/amqp-services";
import { SecurityService } from "./security.service";

@Module({
    imports: [
        ClientsModule.registerAsync([{
            name: 'SECURITY',
            useClass: SecurityTransport
        }])
    ],
    controllers: [],
    providers: [SecurityService],
    exports: [
        SecurityService,
        ClientsModule.registerAsync([{
            name: 'SECURITY',
            useClass: SecurityTransport
        }])
    ]
})
export class SecurityModule {};