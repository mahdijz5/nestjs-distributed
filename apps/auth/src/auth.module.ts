import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common/logger';
import { DatabaseModule } from '@app/common/database';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from './user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal :true,
      envFilePath : "apps/auth/.env",
      validationSchema : Joi.object({
        MONGO_URI : Joi.string().required(), 
        JWT_SECRET : Joi.string().required(),
        JWT_EXPIRATION : Joi.string().required(),
        HTTP_PORT : Joi.number().required(),
        TCP_PORT : Joi.number().required(),
      })
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: "test",
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIRATION")}`
        }
      }),
      inject : [ConfigService]
    }),
   ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy ,JwtStrategy],
})
export class AuthModule { }
