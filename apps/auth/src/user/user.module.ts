import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@app/common/database';
import { UserDocument, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: UserDocument.name,
                schema: UserSchema
            }
        ])
    ],
    providers: [UserService,UserRepository], 
    controllers: [UserController],
    exports : [UserService]
})
export class UserModule { }
