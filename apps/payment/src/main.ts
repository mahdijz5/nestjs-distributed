import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';
import { RmqService } from '@app/common/rmq';
import { NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE, PAYMENT_PACKAGE_NAME, PAYMENT_SERVICE, PAYMENT_SERVICE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule, {});
  const configService = (app.get(ConfigService))
  app.connectMicroservice(
    {
      name: PAYMENT_SERVICE_NAME,
      transport: Transport.GRPC,
      options: {
        package: PAYMENT_PACKAGE_NAME,
        protoPath: join(__dirname, '../../../proto/payment.proto'),
        url: configService.get("PAYMENT_GRPC_URL")
      },
    } 
  )
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))

  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  await app.startAllMicroservices()
  await app.listen(await configService.get("HTTP_PORT"));
}
bootstrap();
