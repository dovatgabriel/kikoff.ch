import { CartItem } from '@/components/cart/cart-item';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useShop } from '@/providers/shop-provider';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState, type FC } from 'react';
import icon from '@/images/icon.png';
import { getPaymentLink } from '@/utils/functions';

type CartProps = object;

interface PaymentLinkResponse {
  data: {
    link: string;
  };
}

export const Cart: FC<CartProps> = () => {
  const [paymentLink, setPaymentLink] = useState<string>();
  const { cart } = useShop();

  useEffect(() => {
    (async () => {
      if (cart.length) {
        const products = cart.map((item) => item.id);
        const origin = window.location.origin;

        const result = (await getPaymentLink({ products, origin })) as PaymentLinkResponse;
        const link = result.data?.link;

        setPaymentLink(link);
      }
    })();
  }, [cart]);

  const handleBack = () => window.history.back();
  const handleGoPayment = () => (window.location.href = paymentLink ?? window.location.origin);

  const cartTotal = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.-]/g, '')), 0)
      .toFixed(2);
  }, [cart]);

  const vat = useMemo(() => {
    return (parseFloat(cartTotal) * 0.081).toFixed(2);
  }, [cartTotal]);

  const total = useMemo(() => (Number(cartTotal) + Number(vat)).toFixed(2), [cartTotal, vat]);

  if (!cart.length) {
    return (
      <div className="h-[80dvh] max-w-screen flex items-center justify-center flex-col">
        <img src={icon} alt="icon" className="h-30 w-auto" />
        <h1 className="text-3xl md:text-6xl font-bold mt-10">Votre panier est vide</h1>
        <h2 className="text-xl text-muted-foreground mt-2">
          Et malheureusement, il n&apos;est pas possible de rien commander.
        </h2>
        <Button className="mt-5 text-lg" size="lg" onClick={handleBack}>
          <ArrowLeft />
          Continuer mes achats
        </Button>
      </div>
    );
  }

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
            <Button
              variant="default"
              size="lg"
              className="text-lg px-0 mt-5"
              onClick={handleGoPayment}
              disabled={!paymentLink}
            >
              Finaliser ma commande
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
