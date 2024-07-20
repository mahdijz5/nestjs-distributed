import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
     imports : [NestConfigModule.forRoot({
          validationSchema  : Joi.object({
               MONGO_URI  : Joi.string()
          })
     })]
})
export class ConfigModule {}
