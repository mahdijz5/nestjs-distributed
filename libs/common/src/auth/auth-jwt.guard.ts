import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map, Observable, tap } from "rxjs";
import { MESSAGE_PATTERN } from "../enum";
import { AUTH_SERVICE } from "../constants";

@Injectable()
export class JwtAuthGaurd implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication || context.switchToHttp().getRequest().headers?.authentication
        if (!jwt) {
            return false
        }
        
          return this.authClient.send(MESSAGE_PATTERN.AUTH.AUTHENTICATE, {
            Authentication: jwt
        }).pipe(
            tap((res) => {
             
                context.switchToHttp().getRequest().user = res

            }),
            map((t) => {
                return true
            })
        )
    }
}