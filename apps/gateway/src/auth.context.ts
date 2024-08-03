import { UnauthorizedException } from "@nestjs/common"
import { app } from "./app"
import { ClientProxy } from "@nestjs/microservices"
import { AUTH_SERVICE } from "@app/common"
import { lastValueFrom } from "rxjs"
import { AUTH_PATTERN } from "@app/common/enum/pattern/auth.enum"

export const authContext = async ({ req }) => {
    try {
        return {}
        const authClient = app.get<ClientProxy>(AUTH_SERVICE)
        const user = await lastValueFrom(authClient.send(AUTH_PATTERN.AUTHENTICATE, {
            Authentication: req?.headers?.authentication
        }))

        return { user }
    } catch (error) {
        throw new UnauthorizedException(error)
    }
}