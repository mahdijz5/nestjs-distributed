import { ApiCustomeProperty } from "@app/common";
import { IsEmail } from "class-validator";

export class NotifyEmailDto {
    @ApiCustomeProperty({example :"test"})
    @IsEmail()
    email : string
}