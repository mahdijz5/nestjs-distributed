import { IsCreditCard, isCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CardDto {
    @IsString()
    @IsNotEmpty()
    cvc: string ="23"
    
    @IsNumber()
    exp_month?: number= 213
    
    @IsNumber()
    exp_year?: number= 23
    
    @IsCreditCard()
    number?: string="23"
 
}