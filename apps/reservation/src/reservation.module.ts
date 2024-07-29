import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE, PAYMENT_PACKAGE_NAME, PAYMENT_SERVICE, RESERVATION_SERVICE } from '@app/common';
import { GrpcModule } from '@app/common/rmq';
import { join } from 'path';
 
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema
      }
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/reservation/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
          name : AUTH_SERVICE,
          useFactory: (configService: ConfigService) => ({
              transport: Transport.GRPC,
              options: {
                 package: AUTH_PACKAGE_NAME,
                 protoPath : join(__dirname, '../../../proto/auth.proto'),
                 url :configService.get("AUTH_GRPC_URL")
              },
          }),
          inject: [ConfigService],
      },
      {
          name : PAYMENT_SERVICE,
          useFactory: (configService: ConfigService) => ({
              transport: Transport.GRPC,
              options: {
                 package: PAYMENT_PACKAGE_NAME,
                 protoPath : join(__dirname, '../../../proto/payment.proto'),
                 url :configService.get("PAYMENT_GRPC_URL")
              },
          }),
          inject: [ConfigService],
      },
  ]),    ,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule { }
