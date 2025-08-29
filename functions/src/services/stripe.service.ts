import { Stripe } from 'stripe';
import * as dotenv from 'dotenv';
import { Category, Item } from '../types/item';

dotenv.config();

export class StripeService {
  private stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

  getTrendingProducts = async (): Promise<Item[]> => {
    const result = await this.stripe.products.search({
      query: "active:'true'",
    });

    const trendingProducts = result.data.filter((product) => product.metadata.trending === 'true');
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
    price: await this.getPrice(product.id),
  });

  private getPrice = async (productId: string): Promise<string> => {
    const prices = await this.stripe.prices.list({ product: productId });
    const cents = prices.data[0].unit_amount ?? 0;

    const amount = (cents / 100).toFixed(2);

    return `CHF ${amount}.-`;
  };
}
