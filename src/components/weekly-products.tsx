import { ProductCard } from '@/components/products/product-card';
import { NavigationButtons } from '@/components/common/navigation-buttons';
import type { Product } from '@/types/product';

interface WeeklyProductsProps {
  products: Product[];
}

export const WeeklyProducts = ({ products }: WeeklyProductsProps) => {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-end gap-2 sm:gap-3">
            <h3 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">CETTE SEMAINE</h3>
            <span className="text-xs font-medium text-indigo-700 sm:text-sm">(04)</span>
          </div>
          <NavigationButtons />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
