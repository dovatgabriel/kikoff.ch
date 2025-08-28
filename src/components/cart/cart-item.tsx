import type { Item } from '@/types/item';
import { EllipsisVertical, Trash } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useShop } from '@/providers/shop-provider';

interface CartItemProps {
  item: Item;
}

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useShop();

  const handleRemoveFromCart = () => removeFromCart(item);

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex items-center gap-3 py-5">
        <img src={item.picture} alt={item.title} className="h-15 rounded" />
        <span className="text-xl">{item.title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">{item.price}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={handleRemoveFromCart}
            >
              <Trash />
              Retirer du panier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
