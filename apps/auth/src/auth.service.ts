import { Injectable } from '@nestjs/common';
import { User } from './user/models/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly configService : ConfigService,private readonly jwtService : JwtService){}
  
  async  login(user : User,response: Response) {
    const tokenPayload =  { 
      userId : user._id.toHexString()
    }
 
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    )

    const token = this.jwtService.sign(tokenPayload)
  
    response.cookie("Authentication",token,{
      httpOnly :true,
      expires,
    })

    return token
  }

}
 