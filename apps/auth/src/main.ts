import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq';
import { AUTH_SERVICE } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {});
  const configService = (app.get(ConfigService))
  const rmqService = app.get(RmqService)
  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE))
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))

  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  await app.startAllMicroservices()
  await app.listen(await configService.get("HTTP_PORT"));
}
bootstrap();
