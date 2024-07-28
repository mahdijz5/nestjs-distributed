import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from '@app/common';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { PaymentCreateChargeDto } from './dto/create-charge.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern(MESSAGE_PATTERN.PAYMENT.CREATE_CHARGE)
  async createCharge(@Payload() data : PaymentCreateChargeDto) {
    return this.paymentService.createCharge(data)
  }
}
