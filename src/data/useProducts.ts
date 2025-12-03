import { functions } from '@/firebase.config';
import type { Product } from '@/types/product';
import { httpsCallable } from 'firebase/functions';
import { useEffect, useMemo, useState } from 'react';

interface UseProductsProps {
  products?: Product[];
  weeklyProducts?: Product[];
  collectionProducts?: Product[];
  approachImages?: string[];
  loading: boolean;
}

export const useProducts = (): UseProductsProps => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fun = httpsCallable(functions, 'getProducts');
      const res = await fun();

      const products = (res.data as { data: Product[] }).data;

      setProducts(products);
      setLoading(false);
    })();
  }, []);

  const weeklyProducts = useMemo(() => {
    return products?.filter((p) => p.weekly);
  }, [products]);

  const collectionProducts = useMemo(() => {
    return products?.filter((p) => p.category);
  }, [products]);

  return { loading, products, weeklyProducts, collectionProducts };
};
