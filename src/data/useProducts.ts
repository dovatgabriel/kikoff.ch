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
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const getProducts = httpsCallable(functions, 'getProducts');
const createProduct = httpsCallable(functions, 'addProduct');
const removeProduct = httpsCallable(functions, 'deleteProduct');

export const useProducts = (): UseProductsProps => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        const result = res.data as { data: Product[] };
        setProducts(result.data);
      } catch (e) {
        console.error('Error fetching products', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
    try {
      const res = await createProduct(product);
      const raw = res.data;

      const stripeId =
        raw?.data?.product?.id ??
        raw?.product?.id ??
        raw?.productId ??
        raw?.id ??
        String(Date.now());

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

  const deleteProduct = async (productId: string): Promise<void> => {
    try {
      await removeProduct({ productId });
      const updatedProducts = [...(products ?? [])].filter((p) => String(p.id) !== productId);
      setProducts(updatedProducts);
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
