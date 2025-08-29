import type { Item } from '@/types/item';
import { getTrendingProducts } from '@/utils/functions';
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';

interface ShopProviderProps {
  children: ReactNode;
}

interface ShopContextProps {
  trending: Item[];
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
}

interface HttpCallResponse {
  data: {
    items: Item[];
  };
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [trending, setTrending] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const result = (await getTrendingProducts()) as HttpCallResponse;
      const trending = result.data.items;

      setTrending(trending);
    })();
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

  const removeFromCart = (item: Item): void => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((i) => i.id === item.id);

    updatedCart.splice(itemIndex, 1);

    window.localStorage.setItem('kikoff-cart', JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  return (
    <ShopContext.Provider value={{ trending, cart, addToCart, removeFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextProps => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
};
