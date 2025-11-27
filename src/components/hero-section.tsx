import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

interface HeroSectionProps {
  image1: string;
  image2: string;
  image3: string;
}

export const HeroSection = ({ image1, image2, image3 }: HeroSectionProps) => {
  return (
    <section className="bg-gray-100 px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-24 xl:px-40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:gap-24">
        {/* Left */}
        <div className="flex w-full flex-col items-start text-left lg:w-1/2">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Nouvelle collection
          </h1>

          <span className="text-muted-foreground mt-2 text-base font-medium sm:mt-3 sm:text-lg">Hiver 2025</span>

          <Link
            to="/products"
            className="mt-4 flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-900 sm:mt-6 sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
          >
            Au magasin
            <MoveRight size={20} strokeWidth={1} className="sm:w-7 sm:h-7" />
          </Link>
        </div>

        {/* Right */}
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 lg:w-1/2">
          {[image1, image2, image3].map((src, i) => (
            <div key={i} className="aspect-3/4 overflow-hidden rounded-xl bg-gray-200 shadow-sm">
              <img
                src={src}
                alt={`Image ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
