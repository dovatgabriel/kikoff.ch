import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '@/images/icon.png';

type NotFoundProps = object;

export const NotFound: FC<NotFoundProps> = () => {
  const navigate = useNavigate();

  const handleBackHome = () => navigate('/');

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <img src={icon} alt="icon" className="h-30 w-auto" />
      <h1 className="text-3xl md:text-6xl font-bold mt-10">Vous êtes perdu(e) ?</h1>
      <h2 className="text-xl text-muted-foreground mt-2">On dirait que cette page n'existe pas</h2>
      <Button className="mt-5 text-lg" size="lg" onClick={handleBackHome}>
        Revenir en lieu sûr <Home />
      </Button>
    </div>
  );
};
