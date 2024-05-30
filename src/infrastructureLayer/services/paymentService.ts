import { IPaymentService } from '../../usecaseLayer/interface/services/IPaymentService';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import ICoinPurchasePlan from '../../domain/coinPurchasePlan';
dotenv.config();

export class PaymentService implements IPaymentService {
    private readonly stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_KEY as string);
    }

    async createPaymentIntent({
        amount,
        userId,
        coinPurchasePlan,
    }: {
        amount: number;
        userId: string;
        coinPurchasePlan: ICoinPurchasePlan;
    }) {
        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: coinPurchasePlan.title,
                            images: [coinPurchasePlan.image],
                            description: `purchase ${coinPurchasePlan.count} gold coins`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/`,
            cancel_url: `${process.env.CLIENT_URL}/`,
            metadata: {
                userId,
                coinPurchasePlanId: coinPurchasePlan.id as string,
                amount,
                coinCount: coinPurchasePlan.count,
            },
        });

        return session.id;
    }

    async verify({
        signature,
        payload,
    }: {
        signature: string;
        payload: Buffer;
    }) {
        const event = this.stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.WEBHOOK_SECRET as string
        );
       
        const eventType = event.type;
        if (eventType === 'checkout.session.completed' ) {
            const session = event.data.object;
            const metadata = session.metadata;
            if(!metadata) return null;

            const transactionId = event.data.object.payment_intent as string;
            const{userId,coinPurchasePlanId,amount,coinCount} =metadata;
            return { metadata:{userId,coinPurchasePlanId,amount:Number(amount),coinCount:Number(coinCount)}, transactionId };
        }
        return null;
    }
}
