import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGaurd } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from './models/user.schema';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Post()
    async createUser(@Body() createUserDto : CreateUserReqDto ) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtAuthGaurd)
    @Get()
    async getUser(@CurrentUser() user :User ) {
        return user;
    }
}
