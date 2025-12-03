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
      const res = await getProducts();

      const products = (res.data as { data: Product[] }).data;

      setProducts(products);
      setLoading(false);
    })();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
    const res = await createProduct(product);
    const updatedProducts = [...(products ?? []), (res.data as { product: Product }).product];
    setProducts(updatedProducts);
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    await removeProduct({ productId });
    const updatedProducts = [...(products ?? [])].filter((p) => String(p.id) !== productId);
    setProducts(updatedProducts);
  };

  const weeklyProducts = useMemo(() => {
    return products?.filter((p) => p.weekly);
  }, [products]);

  const collectionProducts = useMemo(() => {
    return products?.filter((p) => p.category);
  }, [products]);

  return { loading, products, weeklyProducts, collectionProducts, addProduct, deleteProduct };
};
