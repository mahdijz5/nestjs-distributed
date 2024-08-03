import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@app/common/database';
import { User, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user.resolver';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: {
                federation: 2
            }
        }),
    ], 
    providers: [UserService,UserResolver,  UserRepository],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
