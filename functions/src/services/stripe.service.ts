import { Stripe } from 'stripe';
import * as dotenv from 'dotenv';
import { Category, Item } from '../types/item';

dotenv.config();

export class StripeService {
  private stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

  createCheckoutSession = async (products: string[], origin: string): Promise<string> => {
    const lineItems: { price: string; quantity: number }[] = [];

    for (const product of products) {
      const price = await this.getPriceId(product);

      lineItems.push({
        price,
        quantity: 1,
      });
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate: 'shr_1S1KgsRkjMj2XaggtceFXltX',
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/cart`,
    });

    return session.url ?? '';
  };

  getTrendingProducts = async (): Promise<Item[]> => {
    const result = await this.stripe.products.search({
      query: "active:'true' AND metadata['trending']:'true'",
    });

    const trendingProducts = result.data;
    const items: Item[] = [];

    for (const product of trendingProducts) {
      const item = await this.formatItem(product);
      items.push(item);
    }

    return items;
  };

  private formatItem = async (product: Stripe.Product): Promise<Item> => ({
    id: product.id,
    title: product.name,
    picture: product.images[0],
    category: product.metadata.category as Category,
    price: await this.getFormattedPrice(product.id),
  });

  private getFormattedPrice = async (productId: string): Promise<string> => {
    const prices = await this.stripe.prices.list({ product: productId });
    const cents = prices.data[0].unit_amount ?? 0;

    const amount = (cents / 100).toFixed(2);

    return `CHF ${amount}.-`;
  };

  private getPriceId = async (productId: string): Promise<string> => {
    const prices = await this.stripe.prices.list({ product: productId });
    return prices.data[0].id;
  };
}
