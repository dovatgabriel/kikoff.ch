import { useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { NavigationButtons } from '@/components/common/navigation-buttons';
import type { ProductWithCategory } from '@/types/product';

interface CollectionsSectionProps {
  products: ProductWithCategory[];
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
    <section className="bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 sm:mb-8">
          <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">COLLECTIONS</h3>

          <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-4">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  activeFilter === filter.value ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-3 md:gap-8">
          {filteredProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              aspectRatio="portrait"
            />
          ))}
        </div>

        <NavigationButtons className="justify-center" />
      </div>
    </section>
  );
};
