import { CartItem } from '@/components/cart/cart-item';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useShop } from '@/providers/shop-provider';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo, type FC } from 'react';

type CartProps = object;

export const Cart: FC<CartProps> = () => {
  const { cart } = useShop();

  const handleBack = () => window.history.back();

  const cartTotal = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.-]/g, '')), 0)
      .toFixed(2);
  }, [cart]);

  const vat = useMemo(() => {
    return (parseFloat(cartTotal) * 0.081).toFixed(2);
  }, [cartTotal]);

  const total = useMemo(() => (Number(cartTotal) + Number(vat)).toFixed(2), [cartTotal, vat]);

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
            <CartItem item={item} key={key} />
          ))}
        </div>
        <div className="sticky top-30 flex flex-col gap-5 flex-1 bg-card shadow p-4 rounded-md">
          <div className="flex flex-col gap-2 items-stretch">
            <div className="flex items-center justify-between">
              <span className="text-lg font-normal text-muted-foreground">Vos achats</span>
              <span className="text-lg font-normal text-muted-foreground">CHF {cartTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-normal text-muted-foreground">TVA (8.1%)</span>
              <span className="text-lg font-normal text-muted-foreground">CHF {vat}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-medium">Total</span>
              <span className="text-2xl font-semibold">CHF {total}</span>
            </div>
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
