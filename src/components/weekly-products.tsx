import { ImageFallback } from '@/components/figma/image-fallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface WeeklyProductsProps {
  products: Product[];
}

export const WeeklyProducts = ({ products }: WeeklyProductsProps) => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-end gap-3">
            <h3 className="mb-2 text-4xl font-bold">CETTE SEMAINE</h3>
            <span className="text-sm font-medium text-indigo-700">(04)</span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border p-2 hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="rounded-md border p-2 hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <ImageFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="mb-1 text-sm">{product.name}</h4>
              <p className="text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
