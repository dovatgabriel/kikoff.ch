import { Header } from '@/components/header';
import { ProductCard } from '@/components/products/product-card';
import { useFavorites } from '@/contexts/favorites-context';

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
          <h1 className="mb-6 text-2xl font-bold uppercase md:mb-8 md:text-3xl">Favoris</h1>

          {favorites.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-gray-600">Vous n'avez pas encore de favoris</p>
              <p className="text-sm text-gray-500">
                Ajoutez des produits à vos favoris en cliquant sur l'icône cœur
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((item) => (
                <ProductCard
                  key={item.productId}
                  id={item.productId}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onRemove={() => removeFromFavorites(item.productId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
