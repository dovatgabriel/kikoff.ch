import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './providers/shop-provider';
import { ThemeProvider } from './providers/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
