import { ApiCustomeProperty } from "@app/common/decorators";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserReqDto {
    @ApiCustomeProperty({example:"email2@email.com"})
    @IsEmail()
    email : string

    @ApiCustomeProperty({example:"saxfg;kl$#@#FC^2hjweqf23"})
    @IsStrongPassword()
    password : string
}