import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion: "2024-06-20"
    }
  );

  constructor(private readonly configService: ConfigService) { }

  async createCharge({amount,card}:CreateChargeDto) {
    try {
      const paymentMethode = await this.stripe.paymentMethods.create({
        type : "card",
        card,
        
      })

      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method  : paymentMethode.id,
        amount : amount * 100,
        confirm: true,
        payment_method_types : ['card'],
        currency : "usd"
      })

      return paymentIntent
    } catch (err) {
      throw err
    }
  }
}
