import { RmqOptions, Transport } from "@nestjs/microservices";
import { ClientsModuleOptionsFactory } from "@nestjs/microservices/module/interfaces/clients-module.interface";

export class AzureSsoTransport implements ClientsModuleOptionsFactory {
    createClientOptions(): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.AZURE_SSO_QUEUE
            }
        }
    }
}

export class EndpointMongoTransport implements ClientsModuleOptionsFactory {
    createClientOptions(): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.ENDPOINT_MONGO_QUEUE
            }
        }
    }
}

export class SecurityTransport implements ClientsModuleOptionsFactory {
    createClientOptions(): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.SECURITY_QUEUE
            }
        }
    }
}