import { Stripe } from "stripe";

export class CreateChargeDto {
    card: {
        cvc?: string;
        exp_month?: number;
        exp_year?: number;
        networks?: {
            preferred?: Stripe.PaymentMethodCreateParams.Card.Networks.Preferred;
        }
        number?: string;
        token?: string;
    }
    amount: number
}

