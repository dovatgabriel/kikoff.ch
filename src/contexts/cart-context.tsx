import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: { name: string; value: string };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number, size: string, colorValue: string) => void;
  updateQuantity: (productId: number, size: string, colorValue: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const findItemIndex = (
  items: CartItem[],
  productId: number,
  size: string,
  colorValue: string
): number => {
  return items.findIndex(
    (i) => i.productId === productId && i.size === size && i.color.value === colorValue
  );
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const index = findItemIndex(prev, item.productId, item.size, item.color.value);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
        return updated;
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: string, colorValue: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size && i.color.value === colorValue)
      )
    );
  };

  const updateQuantity = (
    productId: number,
    size: string,
    colorValue: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorValue);
      return;
    }

    setItems((prev) => {
      const index = findItemIndex(prev, productId, size, colorValue);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal: () => total,
      getItemCount: () => itemCount,
    }),
    [items, total, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

