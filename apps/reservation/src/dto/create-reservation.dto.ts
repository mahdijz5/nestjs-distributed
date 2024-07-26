import { ApiCustomeProperty } from "@app/common/decorators"
import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { CardDto } from "../../../../libs/common/src/dto/card.dto"
import { ApiProperty } from "@nestjs/swagger"
import { CreateChargeDto } from "@app/common/dto"
import { Type } from "class-transformer"

export class CreateReservationDto {
    @ApiCustomeProperty({ example: new Date() + "" })

    startDate: Date
    @ApiCustomeProperty({ example: new Date() + "" })
    endDate: Date
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    userId: string
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    placeId: string
    @ApiCustomeProperty({ example: "objectId" })
    @IsString()
    invoiceId: string

    @ApiProperty({
        example: new CreateChargeDto()
    })
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto

}
