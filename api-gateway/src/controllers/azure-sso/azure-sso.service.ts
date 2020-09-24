import { Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { throwError, TimeoutError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { sendCommand } from "src/utility/send-command";

@Injectable()
export class AzureSsoService {
    constructor(@Inject("AZURE_SSO") private readonly azureSso: ClientProxy) {}

    async azureCommand(cmd, req) {
        return await sendCommand(this.azureSso, cmd, req);
    }
}