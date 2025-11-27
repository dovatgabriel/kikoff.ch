import { useState } from 'react';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { useCart } from '@/contexts/cart-context';
import { useFavorites } from '@/contexts/favorites-context';

export const Header = () => {
  const { getItemCount } = useCart();
  const { favorites } = useFavorites();
  const itemCount = getItemCount();
  const favoritesCount = favorites.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-999 w-screen border-b bg-white">
      <div className="relative mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="hover:opacity-70">
              Accueil
            </Link>
            <Link to="/products" className="hover:opacity-70">
              Produits
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <Link
            to="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <img src={logo} alt="Kikoff" />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/favorites" className="hidden relative hover:opacity-70 md:block">
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/checkout" className="relative hover:opacity-70">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-full w-full border-b bg-white md:hidden">
            <nav className="flex flex-col px-4 py-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:opacity-70"
              >
                Accueil
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:opacity-70"
              >
                Produits
              </Link>
              <div className="mt-2 flex items-center gap-4 border-t border-gray-200 pt-4">
                <Link
                  to="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative hover:opacity-70"
                >
                  <Heart className="h-5 w-5" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
