import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion: "2024-06-20"
    }
  );

  constructor(private readonly configService: ConfigService) { }

  async createCharge({amount,card}:Stripe.PaymentMethodCreateParams.Card) {
    try {
      console.log(card)
      // const paymentMethode = await this.stripe.paymentMethods.create({
      //   type : "card",
      //   card: {
      //     number: 'tok_visa',
      //     exp_month: 8,
      //     exp_year: 2026,
      //     cvc: '314',
      //     // token : "tok_visa"
      //   }, 
        
      // })  
 
      // const paymentIntent = await this.stripe.paymentIntents.create({
      //   payment_method  : paymentMethode.id,
      //   amount : amount * 100,
      //   confirm: true,
      //   payment_method_types : ['card'],
      //   currency : "usd"
      // })

      return {} 
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
