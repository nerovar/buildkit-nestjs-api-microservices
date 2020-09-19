import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { SecurityService } from "src/shared-services/security/security.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly securityService: SecurityService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.headers.authorization ? request.headers.authorization.split(" ")[1] : null;
            if (token) {
                const resp: any = await this.securityService.validateAzure(token);
                if (resp.status === 'authenticated') {
                    return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}