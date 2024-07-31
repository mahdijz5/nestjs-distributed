import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
 import { ConfigService } from '@nestjs/config';
import { setApp } from './app';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  // app.useLogger(app.get(Logger))

  const configService = app.get(ConfigService)
  await app.listen(6001);
  setApp(app)
}
bootstrap();
 