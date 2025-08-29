import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import { StripeService } from './services/stripe.service';

const stripeService = new StripeService();

export const getTrendingProducts = onRequest({ cors: true }, async (request, response) => {
  logger.info('getTrendingProducts', request.method);

  const products = await stripeService.getTrendingProducts();

  response.json({ data: { items: products } });
});

export const getPaymentLink = onRequest({ cors: true }, async (request, response) => {
  logger.info('getPaymentLink', request.method);

  const { products, origin } = request.body.data;

  const link = await stripeService.createCheckoutSession(products, origin);

  response.json({ data: { link } });
});
