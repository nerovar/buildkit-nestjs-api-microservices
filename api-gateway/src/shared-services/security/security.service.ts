import { Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { throwError, TimeoutError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { sendCommand } from "src/utility/send-command";

@Injectable()
export class SecurityService {
    constructor(@Inject("SECURITY") private readonly security: ClientProxy) {}

    async validateAzure(token) {
        const command = { cmd: 'security-auth-guard' };
        const payload = { token };
        return await sendCommand(this.security, command, payload);
    }
}