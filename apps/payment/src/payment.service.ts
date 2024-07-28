import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { MESSAGE_PATTERN, NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion: "2024-06-20"
    }
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE) private readonly notifClient: ClientProxy
  ) { }

  async createCharge({ amount, card, email }: PaymentCreateChargeDto) {
    try {
      console.log(email)
      // const paymentMethode = await this.stripe.paymentMethods.create({
      //   type : "card",
      //   card 
 

      // })  

      // const paymentIntent = await this.stripe.paymentIntents.create({
      //   payment_method  : paymentMethode.id,
      //   amount : amount * 100,
      //   confirm: true,
      //   payment_method_types : ['card'],
      //   currency : "usd"
      // })
      this.notifClient.emit(MESSAGE_PATTERN.NOTIFICATION.NOTIFY_EMAIL, { email })
      return {}
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
