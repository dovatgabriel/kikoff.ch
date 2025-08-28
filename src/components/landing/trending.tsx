import { useShop } from '@/providers/shop-provider';
import type { FC } from 'react';
import { Marquee } from '../ui/marquee';
import { Item } from '../common/item';

type TrendingProps = object;

export const Trending: FC<TrendingProps> = () => {
  const { trending } = useShop();

  return (
    <div className="max-w-screen py-20">
      <h1 className="text-5xl font-bold px-50">Articles du moment</h1>
      <Marquee className="my-10" duration={200}>
        {trending.map((item, key) => (
          <Item item={item} key={key} />
        ))}
      </Marquee>
    </div>
  );
};
