import { ApiProperty } from "@nestjs/swagger";
import { Stripe } from "stripe";
import { CardDto } from "./card.dto";
import { IsDefined, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChargeDto  {
    @ApiProperty({
        example : new CardDto()
    })
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CardDto)
    @Field(() => CardDto)
    card : CardDto = new CardDto()

    @Field()
    @IsNumber()
    amount : number =2 


}

