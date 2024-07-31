import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "apps/auth/src/user/models/user.schema";

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
 
    
    switch (context.getType<any>()) {
        case "http":
            return context.switchToHttp().getRequest().user
            break;
        case "rpc":
            return context.getArgs()[0]?.user
            break;
        
            case "graphql":
                return JSON.parse(context.getArgs()[2]?.req.headers?.user)

            break;
        
            default:
                break;
    }
    
   
}
export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)