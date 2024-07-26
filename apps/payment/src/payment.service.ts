import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly = new Stripe(this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion : "2024-06-20"
    }
  );

  constructor(private readonly configService: ConfigService) { }

  async createCharge() {
      try {
        const   =          
      } catch ( err) {
        
      }
  }
}
