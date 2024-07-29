import { IsCreditCard, isCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CardMessage } from "../types";

export class CardDto implements CardMessage {
    @IsString()
    @IsNotEmpty()
    cvc: string ="23"
    
    @IsNumber()
    expMonth: number= 213
    
    @IsNumber()
    expYear: number= 23
    
    @IsCreditCard()
    number: string="23"
 
}