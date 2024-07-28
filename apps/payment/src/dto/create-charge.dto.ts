import { CreateChargeDto } from "@app/common/dto";
import { IsEmail } from "class-validator";

export class PaymentCreateChargeDto extends CreateChargeDto {
    @IsEmail()
    email : string
}