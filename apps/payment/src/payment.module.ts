import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
 import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE, NOTIFICATION_SERVICE_NAME } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqModule } from '@app/common/rmq';
import { join } from 'path';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/payment/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLISHABLE_KEY: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      }) 
    }),
    ClientsModule.registerAsync([
      {
          name : NOTIFICATION_SERVICE_NAME,
          useFactory: (configService: ConfigService) => ({
              transport: Transport.GRPC,
              options: {
                 package: NOTIFICATION_PACKAGE_NAME,
                 protoPath : join(__dirname, '../../../proto/notification.proto'),
                 url :configService.get("NOTIFICATION_GRPC_URL")
              },
          }),
          inject: [ConfigService],
      }, 
    
  ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
