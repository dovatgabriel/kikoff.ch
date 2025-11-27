import { Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { ProductDetail } from '@/pages/product-detail';
import { Products } from '@/pages/products';
import { Checkout } from '@/pages/checkout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};
