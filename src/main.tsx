import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/app';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '@/contexts/cart-context';
import { FavoritesProvider } from '@/contexts/favorites-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
