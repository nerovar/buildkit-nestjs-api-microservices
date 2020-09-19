import { Controller, Get, Query, Response } from "@nestjs/common";
import { AzureSsoService } from "./azure-sso.service";

@Controller()
export class AzureSsoController {
    constructor(private readonly azureSsoService: AzureSsoService) {}

    @Get('/azure/sso')
    async azureSso(@Query('code') code, @Response() res) {
        res.send(await this.azureSsoService.authenticate(code));
    }
}