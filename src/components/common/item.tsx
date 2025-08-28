import type { Item as ItemType } from '@/types/item';
import type { FC } from 'react';

interface ItemProps {
  item: ItemType;
}

export const Item: FC<ItemProps> = ({ item }) => {
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
      <div className="flex flex-col gap-1 px-4 pb-3">
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <h3 className="text-lg text-muted-foreground">{item.price}</h3>
      </div>
    </div>
  );
};
