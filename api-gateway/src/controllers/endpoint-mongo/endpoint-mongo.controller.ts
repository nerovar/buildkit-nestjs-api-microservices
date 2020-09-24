import { Controller, Get, Param, Post, Request, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { EndpointMongoService } from "./endpoint-mongo.service";

@Controller('endpoint-mongo')
export class EndpointMongoController {
    constructor(private readonly endpointMongoService: EndpointMongoService) {}

    @UseGuards(AuthGuard)
    @Get(':cmd')
    async get(@Param('cmd') cmd, @Request() req, @Response() res) {
        const { code, status, error, data } = await this.endpointMongoService.endpointMongoCommand(cmd, req)
        res.status(code || 500).send({status, error, data});
    }

    @UseGuards(AuthGuard)
    @Post(':cmd')
    async post(@Param('cmd') cmd, @Request() req, @Response() res) {
        const { code, status, error, data } = await this.endpointMongoService.endpointMongoCommand(cmd, req)
        res.status(code || 500).send({status, error, data});
    }
}