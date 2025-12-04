import * as dotenv from 'dotenv';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
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

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface CreateCheckoutPayload {
  items: CheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
}

const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://test.kikoff.ch', 'https://kikoff.ch'];

function withCors(
  handler: (req: any, res: any) => Promise<void> | void,
  allowedMethods: string[] = ['GET', 'POST', 'OPTIONS'],
) {
  return (req: any, res: any) => {
    const origin = req.headers.origin as string | undefined;

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(','));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    return handler(req, res);
  };
}

export const createCheckoutSession = onRequest(
  withCors(
    async (req, res) => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const { items, successUrl, cancelUrl } = req.body as CreateCheckoutPayload;

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'items is required and must be a non-empty array' });
        return;
      }

      const success_url = successUrl ?? process.env.CHECKOUT_SUCCESS_URL;
      const cancel_url = cancelUrl ?? process.env.CHECKOUT_CANCEL_URL;

      if (!success_url || !cancel_url) {
        res.status(500).json({ error: 'CHECKOUT_SUCCESS_URL or CHECKOUT_CANCEL_URL not set' });
        return;
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      try {
        for (const item of items) {
          if (!item.productId || !item.quantity || item.quantity <= 0) {
            res.status(400).json({
              error: 'Each item must have a valid productId and quantity > 0',
            });
            return;
          }

          const product = await stripe.products.retrieve(item.productId, {
            expand: ['default_price'],
          });

          const defaultPrice = product.default_price as Stripe.Price | null;

          if (!defaultPrice || typeof defaultPrice !== 'object' || !defaultPrice.id) {
            res.status(400).json({
              error: `Product ${item.productId} has no default price`,
            });
            return;
          }

          lineItems.push({
            price: defaultPrice.id,
            quantity: item.quantity,
          });
        }

        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: lineItems,
          success_url,
          cancel_url,
          billing_address_collection: 'required',
          shipping_address_collection: {
            allowed_countries: ['CH', 'FR', 'DE', 'IT'],
          },
          automatic_tax: {
            enabled: false,
          },
        });

        if (!session.url) {
          res.status(500).json({ error: 'Failed to create checkout session' });
          return;
        }

        res.status(200).json({ url: session.url });
      } catch (e: any) {
        logger.error('Error creating checkout session', e);
        res.status(500).json({ error: 'Failed to create checkout session', details: e?.message });
      }
    },
    ['POST', 'OPTIONS'],
  ),
);

export const getProducts = onRequest(
  withCors(
    async (req, res) => {
      if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

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

        res.status(200).json({ data: products });
      } catch (e: any) {
        logger.error('Error fetching products', e);
        res.status(500).json({ error: 'Failed to fetch products', details: e?.message });
      }
    },
    ['GET', 'OPTIONS'],
  ),
);

export const addProduct = onRequest(
  withCors(
    async (req, res) => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      try {
        const product = req.body as Product;

        if (!product?.name || !product?.price || !product?.description) {
          res.status(400).json({ error: 'Missing required fields' });
          return;
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

        res.status(200).json({
          product: stripeProduct,
          price,
        });
      } catch (error: any) {
        logger.error('Error creating product in Stripe', error);
        res.status(500).json({ error: 'Failed to create product', details: error?.message });
      }
    },
    ['POST', 'OPTIONS'],
  ),
);

export const deleteProduct = onRequest(
  withCors(
    async (req, res) => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const { productId } = req.body as { productId: string };

      if (!productId || typeof productId !== 'string') {
        res.status(400).json({ error: 'productId is required' });
        return;
      }

      try {
        const updatedProduct = await stripe.products.update(productId, {
          active: false,
        });

        res.status(200).json({
          success: true,
          product: updatedProduct,
        });
      } catch (e: any) {
        logger.error('Error deleting product in Stripe', e);
        res.status(500).json({ error: 'Failed to delete product', details: e?.message });
      }
    },
    ['POST', 'OPTIONS'],
  ),
);
