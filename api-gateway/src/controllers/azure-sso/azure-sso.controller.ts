import { Controller, Get, Param, Request, Response } from "@nestjs/common";
import { AzureSsoService } from "./azure-sso.service";

@Controller('azure')
export class AzureSsoController {
    constructor(private readonly azureSsoService: AzureSsoService) {}

    @Get(':cmd')
    async azureSso(@Param('cmd') cmd, @Request() req, @Response() res) {
        const { code, status, error, data } = await this.azureSsoService.azureCommand(cmd, req)
        res.status(code || 500).send({status, error, data});
    }
}