import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureSsoController } from './controllers/azure-sso/azure-sso.controller';
import { AzureSsoModule } from './controllers/azure-sso/azure-sso.module';
import { EndpointMongoController } from './controllers/endpoint-mongo/endpoint-mongo.controller';
import { EndpointMongoModule } from './controllers/endpoint-mongo/endpoint-mongo.module';
import { SecurityModule } from './shared-services/security/security.module';

@Module({
  imports: [
    AzureSsoModule,
    SecurityModule,
    EndpointMongoModule
  ],
  controllers: [
    AppController,
    AzureSsoController,
    EndpointMongoController
  ],
  providers: [AppService],
})
export class AppModule {}
