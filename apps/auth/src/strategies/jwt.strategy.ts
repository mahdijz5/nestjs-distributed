import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
      private readonly jwtService: JwtService, 

   ) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([
            (requset: any) => {
               console.log("adasdsad")
               const jwt = requset?.cookies?.Authentication || requset?.Authentication || requset?.headers.Authentication
               console.log(jwt)
               return jwt
            }
         ]),
         secretOrKey: "test"
      })
   }

   async validate({ userId }: TokenPayload) {
      console.log("userId")
      console.log(userId)
      return this.userService.getUser({ _id: userId })
   }
}