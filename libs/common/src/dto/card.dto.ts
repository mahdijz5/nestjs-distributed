import { Field, InputType } from "@nestjs/graphql";
import { IsCreditCard, isCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CardDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    cvc: string ="23"
    
    @Field()
    @IsNumber()
    exp_month?: number= 213
    
    @Field()
    @IsNumber()
    exp_year?: number= 23
    
    @Field()
    @IsCreditCard()
    number?: string="23"
 
}