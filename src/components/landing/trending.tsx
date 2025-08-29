import { useShop } from '@/providers/shop-provider';
import type { FC } from 'react';
import { Item } from '../common/item';
import { Skeleton } from '../ui/skeleton';

type TrendingProps = object;

export const Trending: FC<TrendingProps> = () => {
  const { trending } = useShop();

  return (
    <div className="max-w-screen py-20 px-50">
      <h1 className="text-5xl font-bold">Articles du moment</h1>
      <div className="flex items-stretch gap-3 flex-wrap mt-10">
        {trending.length > 0 ? (
          <>
            {trending.map((item, key) => (
              <Item item={item} key={key} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, key) => (
              <Skeleton className="w-[376px] h-[556px] rounded-lg" key={key} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
