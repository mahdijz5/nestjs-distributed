import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloGatewayDriver,ApolloGatewayDriverConfig} from "@nestjs/apollo"
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
       driver : ApolloGatewayDriver,
       useFactory : (configService : ConfigService) => ({
        gateway : {
          supergraphSdl : new IntrospectAndCompose({
            subgraphs : [
              {
                name : "reservation",
                url : configService.getOrThrow("RESERVATION_GRAPHQL_URL")
              }
            ]
          })
        }
       })
    }),
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/reservation/.env",
      validationSchema: Joi.object({
         HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      })
    })
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
