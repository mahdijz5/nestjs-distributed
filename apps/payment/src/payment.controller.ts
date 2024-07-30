import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN, PaymentServiceController, PaymentServiceControllerMethods } from '@app/common';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { PaymentCreateChargeDto } from './dto/create-charge.dto';

@Controller()
@PaymentServiceControllerMethods()
export class PaymentController implements PaymentServiceController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern(MESSAGE_PATTERN.PAYMENT.CREATE_CHARGE)
  async createCharge(  data : PaymentCreateChargeDto) {
    return this.paymentService.createCharge(data)
  }
}
