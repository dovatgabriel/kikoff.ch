import type { FC } from 'react';

type HeroProps = object;

const heroBackground =
  'https://images.unsplash.com/photo-1708214837981-1a2c1abd5464?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Hero: FC<HeroProps> = () => {
  return (
    <div
      className="h-[80dvh] max-w-screen flex items-center justify-content bg-fixed bg-bottom-left bg-cover px-40"
      style={{ backgroundImage: `url('${heroBackground}')` }}
    >
      <h1 className="text-3xl md:text-[88px] font-extrabold text-white">
        Votre boutique de sport en ligne
      </h1>
    </div>
  );
};
