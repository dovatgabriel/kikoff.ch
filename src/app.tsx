import { Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { ProductDetail } from '@/pages/product-detail';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};
