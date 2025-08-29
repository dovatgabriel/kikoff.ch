import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const getTrendingProducts = httpsCallable(functions, 'getTrendingProducts');
export const getPaymentLink = httpsCallable(functions, 'getPaymentLink');
