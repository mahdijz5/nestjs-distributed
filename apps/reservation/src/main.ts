import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule,{ });
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
