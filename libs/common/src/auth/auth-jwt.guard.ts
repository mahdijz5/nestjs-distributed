import { CanActivate, ExecutionContext, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable, tap } from "rxjs";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient } from "../types";

@Injectable()
export class JwtAuthGaurd implements CanActivate, OnModuleInit {
    private readonly logger = new Logger(JwtAuthGaurd.name)
    private authservice: AuthServiceClient

    constructor(@Inject(AUTH_PACKAGE_NAME) private readonly authClient: ClientGrpc) { }

    onModuleInit() {
        this.authservice = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication || context.switchToHttp().getRequest().headers?.authentication
        if (!jwt) {
            return false
        }

        return this.authservice.authenticate({ Authentication: jwt }).pipe(
            tap((res) => {
                context.switchToHttp().getRequest().user = {
                    ...res,
                    _id: res.id
                }

            }),
            map((t) => {
                return true
            })
        )
    }
}