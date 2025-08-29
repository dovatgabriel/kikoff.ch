import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

export const getTrendingProducts = onRequest({ cors: true }, (request, response) => {
  logger.info('getTrendingProducts', request.method);
  response.json({ data: { items: [] } });
});
