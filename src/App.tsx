import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Landing } from './pages/landing';
import { NotFound } from './pages/not-found';

type AppProps = object;

export const App: FC<AppProps> = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
