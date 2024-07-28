import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/notification/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        EMAIL_USERNAME: Joi.string().required(),  
        EMAIL_PASSWORD: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      })
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }
