import { useShop } from '@/providers/shop-provider';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '@/images/icon.png';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

type PaymentSuccessProps = object;

export const PaymentSuccess: FC<PaymentSuccessProps> = () => {
  const { clearCart } = useShop();
  const navigate = useNavigate();

  useEffect(clearCart, []);

  const handleBackHome = () => navigate('/');

  return (
    <div className="h-[80dvh] max-w-screen flex items-center justify-center flex-col">
      <img src={icon} alt="icon" className="h-30 w-auto" />
      <h1 className="text-3xl md:text-6xl font-bold mt-10">Merci pour votre achat !</h1>
      <h2 className="text-xl text-muted-foreground mt-2">On se réjouit de vous revoir</h2>
      <Button className="mt-5 text-lg" size="lg" onClick={handleBackHome}>
        Revenir à l&apos;accueil <Home />
      </Button>
    </div>
  );
};
