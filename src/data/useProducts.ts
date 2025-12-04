import type { Product } from '@/types/product';
import { useEffect, useMemo, useState } from 'react';

interface UseProductsProps {
  products?: Product[];
  weeklyProducts?: Product[];
  collectionProducts?: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const BASE_URL = 'https://us-central1-kikoff-ch-14e6b.cloudfunctions.net';

export const useProducts = (): UseProductsProps => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>();

  //
  // GET PRODUCTS
  //
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/getProducts`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const result = (await res.json()) as { data: Product[] };
        setProducts(result.data);
      } catch (e) {
        console.error('Error fetching products', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //
  // ADD PRODUCT
  //
  const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/addProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const raw = await res.json();

      const stripeId = raw?.product?.id ?? raw?.data?.product?.id ?? raw?.id ?? String(Date.now());

      const newProduct: Product = {
        ...product,
        id: stripeId,
      };

      setProducts((prev) => [...(prev ?? []), newProduct]);
    } catch (e) {
      console.error('Error creating product', e);
      throw e;
    }
  };

  //
  // DELETE PRODUCT
  //
  const deleteProduct = async (productId: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/deleteProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      setProducts((prev) => (prev ?? []).filter((p) => String(p.id) !== productId));
    } catch (e) {
      console.error('Error deleting product', e);
      throw e;
    }
  };

  const weeklyProducts = useMemo(() => {
    return products?.filter((p) => p.weekly);
  }, [products]);

  const collectionProducts = useMemo(() => {
    return products?.filter((p) => p.category);
  }, [products]);

  return { loading, products, weeklyProducts, collectionProducts, addProduct, deleteProduct };
};
