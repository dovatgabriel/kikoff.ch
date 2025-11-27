import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

interface HeroSectionProps {
  image1: string;
  image2: string;
  image3: string;
}

export const HeroSection = ({ image1, image2, image3 }: HeroSectionProps) => {
  return (
    <section className="bg-gray-100 px-6 py-20 md:px-12 lg:px-24 xl:px-40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-24">
        {/* Left */}
        <div className="flex w-full flex-col items-start text-left lg:w-1/2">
          <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            Nouvelle collection
          </h1>

          <span className="text-muted-foreground mt-3 text-lg font-medium">Hiver 2025</span>

          <Link
            to="/products"
            className="mt-6 flex items-center gap-3 rounded-xl bg-gray-800 px-6 py-3 text-white transition hover:bg-gray-900"
          >
            Au magasin
            <MoveRight size={28} strokeWidth={1} />
          </Link>
        </div>

        {/* Right */}
        <div className="grid w-full grid-cols-3 gap-4 lg:w-1/2">
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
