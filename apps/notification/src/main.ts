import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';
import { RmqService } from '@app/common/rmq';
import { NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE, NOTIFICATION_SERVICE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule, {});
  const configService = (app.get(ConfigService))
 
  app.connectMicroservice({
    name: NOTIFICATION_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notification.proto'),
      url: configService.get("NOTIFICATION_GRPC_URL")
    },
  }
  )
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))

  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  await app.startAllMicroservices()
}
bootstrap();
