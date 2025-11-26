import { Link } from 'react-router-dom';
import { ImageFallback } from '@/components/figma/image-fallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'all' | 'men' | 'women' | 'kids';
}

interface CollectionsSectionProps {
  products: Product[];
}

const FILTERS = [
  { value: 'all' as const, label: 'TOUT' },
  { value: 'men' as const, label: 'HOMME' },
  { value: 'women' as const, label: 'FEMME' },
  { value: 'kids' as const, label: 'ENFANT' },
] as const;

export const CollectionsSection = ({ products }: CollectionsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'men' | 'women' | 'kids'>('all');

  const filteredProducts =
    activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h3 className="mb-6 text-4xl font-bold">COLLECTIONS</h3>

          <div className="mb-8 flex gap-4">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-4 py-2 transition-colors ${
                  activeFilter === filter.value ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de produits */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {filteredProducts.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="mb-4 aspect-3/4 overflow-hidden rounded-lg bg-white">
                <ImageFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="mb-1">{product.name}</h4>
              <p>{product.price}</p>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2">
          <button className="rounded-md border p-2 hover:bg-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="rounded-md border p-2 hover:bg-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
