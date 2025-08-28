import type { Item as ItemType } from '@/types/item';
import { useMemo, type FC } from 'react';
import { Button } from '../ui/button';
import { Check, CirclePlus } from 'lucide-react';
import { useShop } from '@/providers/shop-provider';

interface ItemProps {
  item: ItemType;
}

export const Item: FC<ItemProps> = ({ item }) => {
  const { cart, addToCart } = useShop();

  const alreadyInCart = useMemo(() => cart.some((i) => i.id === item.id), [cart]);
  const handleAddToCart = () => addToCart(item);

  return (
    <div className="bg-card shadow p-2 rounded-lg flex flex-col gap-4">
      <div className="overflow-hidden rounded-md">
        <img
          className="h-100 w-90 object-cover rounded-md hover:scale-110 transition-transform duration-300"
          src={item.picture}
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 px-4 pb-1">
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <h3 className="text-lg text-muted-foreground">{item.price}</h3>
      </div>
      {alreadyInCart ? (
        <Button size="lg" className="text-lg" variant="outline" disabled>
          Dans le panier
          <Check />
        </Button>
      ) : (
        <Button size="lg" className="text-lg" variant="default" onClick={handleAddToCart}>
          Ajouter au panier
          <CirclePlus />
        </Button>
      )}
    </div>
  );
};
