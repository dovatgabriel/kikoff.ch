import * as dotenv from 'dotenv';
import * as logger from 'firebase-functions/logger';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ProductColor {
  name: string;
  value: string;
}

type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2X';

type ProductCategory = 'men' | 'women' | 'kids' | 'unisex';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[] | string[];
  images: string[];
  category?: ProductCategory;
}

export const getProducts = onCall(async () => {
  try {
    const stripeProducts = await stripe.products.list({
      active: true,
      limit: 100,
      expand: ['data.default_price'],
    });

    const products: Product[] = stripeProducts.data.map((p) => {
      let price = 0;
      const defaultPrice = p.default_price as Stripe.Price | null;
      if (
        defaultPrice &&
        typeof defaultPrice === 'object' &&
        typeof defaultPrice.unit_amount === 'number' &&
        !Number.isNaN(defaultPrice.unit_amount)
      ) {
        price = defaultPrice.unit_amount / 100;
      }

      const meta = p.metadata || {};

      let sizes: string[] = [];
      let colors: ProductColor[] = [];
      let imagesFromMeta: string[] = [];

      try {
        if (meta.sizes) sizes = JSON.parse(meta.sizes);
      } catch {}

      try {
        if (meta.colors) colors = JSON.parse(meta.colors);
      } catch {}

      try {
        if (meta.images) imagesFromMeta = JSON.parse(meta.images);
      } catch {}

      return {
        id: p.id as any,
        name: p.name,
        price,
        description: p.description ?? '',
        colors,
        sizes,
        images: imagesFromMeta.length ? imagesFromMeta : (p.images ?? []),
        category: (meta.category ?? undefined) as any,
      };
    });

    return { data: products };
  } catch (e: any) {
    throw new HttpsError('internal', 'Failed to fetch products', e?.message);
  }
});

export const addProduct = onCall(async (request) => {
  try {
    const product = request.data as Product;

    if (!product?.name || !product?.price || !product?.description) {
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    logger.info('Creating product in Stripe', { name: product.name });

    const metadata: Stripe.MetadataParam = {
      id: String(product.id),
      category: product.category ?? '',
      sizes: JSON.stringify(product.sizes),
      colors: JSON.stringify(product.colors),
      images: JSON.stringify(product.images),
    };

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: product.images,
      metadata,
    });

    const price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100),
      currency: 'chf',
    });

    await stripe.products.update(stripeProduct.id, {
      default_price: price.id,
    });

    logger.info('Product created in Stripe', {
      stripeProductId: stripeProduct.id,
      priceId: price.id,
    });

    return {
      product: stripeProduct,
      price,
    };
  } catch (error: any) {
    logger.error('Error creating product in Stripe', error);
    throw new HttpsError('internal', 'Failed to create product', error?.message);
  }
});
