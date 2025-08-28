import { trendingItems } from '@/constants/trending';
import type { Item } from '@/types/item';
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';

interface ShopProviderProps {
  children: ReactNode;
}

interface ShopContextProps {
  trending: Item[];
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [trending, setTrending] = useState<Item[]>([]);

  useEffect(() => {
    setTrending(trendingItems);
  }, []);

  return <ShopContext.Provider value={{ trending }}>{children}</ShopContext.Provider>;
};

export const useShop = (): ShopContextProps => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
};
