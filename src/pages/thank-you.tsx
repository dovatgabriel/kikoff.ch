import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/cart-context';
import { useEffect } from 'react';

export const ThankYouPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
      <div className="animate-fade-in flex flex-col items-center text-center">
        <div className="relative">
          <CheckCircle className="animate-scale-in mb-4 h-20 w-20 text-green-500 drop-shadow-md" />
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">Merci pour votre commande !</h1>

        <p className="text-muted-foreground mb-6 max-w-md">
          Votre commande a été reçue et est en cours de traitement. Vous recevrez un email de
          confirmation d’ici quelques instants.
        </p>

        <Link to="/">
          <Button variant="default" className="px-6">
            Retour à la boutique
          </Button>
        </Link>
      </div>
    </div>
  );
};
