import { useShop } from '@/providers/shop-provider';
import type { FC } from 'react';
import { Item } from '../common/item';

type TrendingProps = object;

export const Trending: FC<TrendingProps> = () => {
  const { trending } = useShop();

  return (
    <div className="max-w-screen py-20 px-50">
      <h1 className="text-5xl font-bold">Articles du moment</h1>
      <div className="flex items-stretch gap-3 flex-wrap mt-10">
        {trending.map((item, key) => (
          <Item item={item} key={key} />
        ))}
      </div>
    </div>
  );
};
