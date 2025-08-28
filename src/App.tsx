import { useScroll } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/ui/footer';
import { Navbar } from './components/ui/navbar';
import { Landing } from './pages/landing';
import { NotFound } from './pages/not-found';

type AppProps = object;

export const App: FC<AppProps> = () => {
  const [navbarTransparent, setNavbarTransparent] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setNavbarTransparent(latest < 200);
    });

    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <Navbar transparent={navbarTransparent && pathname === '/'} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
