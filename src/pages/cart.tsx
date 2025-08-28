import { useShop } from '@/providers/shop-provider';
import { Badge } from '@/components/ui/badge';
import { useMemo, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, EllipsisVertical } from 'lucide-react';

type CartProps = object;

export const Cart: FC<CartProps> = () => {
  const { cart } = useShop();

  const handleBack = () => window.history.back();

  const total = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.-]/g, '')), 0)
      .toFixed(2);
  }, [cart]);

  return (
    <div className="min-h-[60dvh] pt-[20dvh] px-50">
      <div className="flex items-start gap-3">
        <h1 className="text-5xl font-bold relative">Votre panier</h1> <Badge>{cart.length}</Badge>
      </div>
      <Button variant="link" size="lg" className="text-lg px-0 mt-5" onClick={handleBack}>
        <ArrowLeft />
        Continuer mes achats
      </Button>
      <div className="flex items-start gap-20">
        <div className="mt-5 flex flex-col items-stretch flex-2">
          {cart.map((item, key) => (
            <div className="flex items-center justify-between border-b" key={key}>
              <div className="flex items-center gap-3 py-5">
                <img src={item.picture} alt={item.title} className="h-15 rounded" />
                <span className="text-xl">{item.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">{item.price}</span>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky top-30 flex flex-col gap-5 flex-1 bg-card shadow p-4 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">Total</span>
            <span className="text-2xl font-semibold">CHF {total}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Button variant="ghost" size="lg" className="text-lg px-0 mt-5" onClick={handleBack}>
              <ArrowLeft />
              Continuer mes achats
            </Button>
            <Button variant="default" size="lg" className="text-lg px-0 mt-5" onClick={handleBack}>
              Finaliser ma commande
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
