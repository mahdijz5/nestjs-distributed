import { ApiCustomeProperty } from "@app/common/decorators"
import { IsDate, IsString } from "class-validator"

export class CreateReservationDto {
    @ApiCustomeProperty({example :new Date()+""})
    @IsDate()
    startDate: Date
    @ApiCustomeProperty({example :new Date()+""})
    @IsDate()
    endDate: Date
    @ApiCustomeProperty({example :"objectId"})
    @IsString()
    userId: string
    @ApiCustomeProperty({example :"objectId"})
    @IsString()
    placeId: string
    @ApiCustomeProperty({example :"objectId"})
    @IsString()
    invoiceId: string
}
