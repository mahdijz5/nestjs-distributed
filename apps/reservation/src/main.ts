import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule, {})
  const configService = app.get(ConfigService)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: configService.get("TCP_PORT")
    }
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  app.startAllMicroservices()
  app.use(cookieParser())
  await app.listen(await configService.get("HTTP_PORT"));

}
bootstrap();
