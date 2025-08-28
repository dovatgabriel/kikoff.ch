import { trendingItems } from '@/constants/trending';
import type { Item } from '@/types/item';
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';

interface ShopProviderProps {
  children: ReactNode;
}

interface ShopContextProps {
  trending: Item[];
  cart: Item[];
  addToCart: (item: Item) => void;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [trending, setTrending] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    setTrending(trendingItems);
  }, []);

  useEffect(() => {
    const savedCart = window.localStorage.getItem('kikoff-cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: Item): void => {
    const updatedCart = [...cart];
    updatedCart.push(item);

    window.localStorage.setItem('kikoff-cart', JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  return (
    <ShopContext.Provider value={{ trending, cart, addToCart }}>{children}</ShopContext.Provider>
  );
};

export const useShop = (): ShopContextProps => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
};
