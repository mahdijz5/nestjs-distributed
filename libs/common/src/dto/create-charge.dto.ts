import { ApiProperty } from "@nestjs/swagger";
import { Stripe } from "stripe";
import { CardDto } from "./card.dto";
import { IsDefined, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateChargeMessage } from "../types";

export class CreateChargeDto implements Omit<CreateChargeMessage,'email' > {
    @ApiProperty({
        example : new CardDto()
    })
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CardDto)
    card : CardDto = new CardDto()

    @IsNumber()
    amount : number =2 


}

