import { ApiCustomeProperty } from "@app/common/decorators";
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsStrongPassword } from "class-validator";

@InputType()
export class CreateUserReqDto {

    @Field()
    @ApiCustomeProperty({example:"email2@email.com"})
    @IsEmail()
    email : string
    
    @Field()
    @ApiCustomeProperty({example:"saxfg;kl$#@#FC^2hjweqf23"})
    @IsStrongPassword()
    password : string
}