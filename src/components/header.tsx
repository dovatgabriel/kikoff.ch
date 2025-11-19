import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import logo from '@/assets/logo.svg';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-999 w-screen border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Navigation gauche */}
          <nav className="flex items-center gap-8">
            <a href="#" className="hover:opacity-70">
              Home
            </a>
            <a href="#" className="hover:opacity-70">
              Collections
            </a>
            <a href="#" className="hover:opacity-70">
              New
            </a>
          </nav>

          {/* Logo central */}
          <img className="absolute left-1/2 -translate-x-1/2 transform" src={logo} alt="Kikoff" />

          {/* Icônes droite */}
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative hover:opacity-70">
              <Heart className="h-5 w-5" />
            </button>
            <button className="relative hover:opacity-70">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                0
              </span>
            </button>
            <button className="hover:opacity-70">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
