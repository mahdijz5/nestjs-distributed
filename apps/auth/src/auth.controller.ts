import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UserDocument } from './user/models/user.schema';
import { Response } from 'express';
import { CreateUserReqDto } from './user/dto/create-user.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from '@app/common';
import { JwtAuthGaurd } from './guards/jwt-auth.guard';

@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() createUserDto: CreateUserReqDto, @CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(user, response)
    response.send(token)
  }

  @UseGuards(JwtAuthGaurd)
  @MessagePattern(MESSAGE_PATTERN.AUTH.AUTHENTICATE)
  async authenticate(@CurrentUser() user: UserDocument) {
    return user
  }

}

