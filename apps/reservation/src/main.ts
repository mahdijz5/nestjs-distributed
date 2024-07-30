import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { RmqService } from '@app/common/rmq';
import { RESERVATION_SERVICE } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule, {})
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  app.use(cookieParser())
  await app.listen(await configService.get("HTTP_PORT"));

}
bootstrap();
