import { Controller, Get, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { EndpointMongoService } from "./endpoint-mongo.service";

@Controller()
export class EndpointMongoController {
    constructor(private readonly endpointMongoService: EndpointMongoService) {}

    @UseGuards(AuthGuard)
    @Get('/endpoint-mongodb')
    async getAll(@Response() res) {
        res.send(await this.endpointMongoService.getAll());
    }
}