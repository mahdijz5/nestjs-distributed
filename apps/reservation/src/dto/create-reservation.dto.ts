import { ApiCustomeProperty } from "@app/common/decorators"
import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { CardDto } from "../../../../libs/common/src/dto/card.dto"
import { ApiProperty } from "@nestjs/swagger"
import { CreateChargeDto } from "@app/common/dto"
import { Type } from "class-transformer"
import { Field, InputType } from "@nestjs/graphql"


@InputType()
export class CreateReservationDto {
    @Field()
    @IsDate()
    startDate: Date
    
    @Field()
    @IsDate()
    endDate: Date
    
    @Field()
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    userId: string
    
    @Field()
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    placeId: string
    
    @Field()
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    invoiceId: string
    
    @Field(() => CreateChargeDto)
    @ApiProperty({
        example: new CreateChargeDto()
    })
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto

}
