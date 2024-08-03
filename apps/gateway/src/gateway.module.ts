import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo"
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { RmqModule } from '@app/common/rmq';
import { AUTH_SERVICE } from '@app/common';
import { authContext } from './auth.context';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/gateway/.env",
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RESERVATION_GRAPHQL_URL: Joi.string().required(),
      })
    }),    
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({   
        server : {  
          context : authContext  
        },
        gateway: {  
          
           supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: "reservation",
                url: configService.getOrThrow("RESERVATION_GRAPHQL_URL")
              },  
              {
                name: "auth",  
                url: configService.getOrThrow("AUTH_GRAPHQL_URL")
              },
            ]
          }),
          buildService({url}) {
                return new RemoteGraphQLDataSource({
                  url,
                  willSendRequest({request,context}) {
                    request.http.headers.set('user',context.user ? JSON.stringify(context.user) : null)
                  }
                })
          }
        }
        
      }),
      inject :[ConfigService]
    }),
    
    RmqModule.register([AUTH_SERVICE])
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
