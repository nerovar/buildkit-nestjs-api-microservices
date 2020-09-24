import { Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { throwError, TimeoutError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { sendCommand } from "src/utility/send-command";

@Injectable()
export class EndpointMongoService {
    constructor(@Inject("ENDPOINT_MONGO") private readonly endpointMongo: ClientProxy) {}

    async endpointMongoCommand(cmd, req) {
        return await sendCommand(this.endpointMongo, cmd, req);
    }
}