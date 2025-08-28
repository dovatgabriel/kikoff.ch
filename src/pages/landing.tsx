import { Hero } from '@/components/landing/hero';
import { Trending } from '@/components/landing/trending';
import { type FC } from 'react';

type LandingProps = object;

export const Landing: FC<LandingProps> = () => {
  return (
    <>
      <Hero />
      <Trending />
    </>
  );
};
