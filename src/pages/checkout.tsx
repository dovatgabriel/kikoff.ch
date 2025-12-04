import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Header } from '@/components/header';
import { ImageFallback } from '@/components/figma/image-fallback';
import { QuantityControl } from '@/components/common/quantity-control';
import { useCart } from '@/contexts/cart-context';
import type { CheckoutItem } from '@/types/product';

const FUNCTIONS_BASE_URL = 'https://us-central1-kikoff-ch-14e6b.cloudfunctions.net';

export const Checkout = () => {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleCheckout = async () => {
    try {
      const checkoutItems: CheckoutItem[] = items.map((item) => ({
        productId: String(item.productId),
        quantity: item.quantity,
      }));

      const res = await fetch(`${FUNCTIONS_BASE_URL}/createCheckoutSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: checkoutItems,
        }),
      });

      if (!res.ok) {
        console.error('Error creating checkout session', await res.text());
        return;
      }

      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (e) {
      console.error('Error during checkout', e);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold">Votre panier est vide</h1>
              <p className="text-gray-600">Ajoutez des produits pour continuer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
          <h1 className="mb-6 text-2xl font-bold uppercase md:mb-8 md:text-3xl">Panier</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color.value}-${index}`}
                    className="flex flex-col gap-3 rounded-lg bg-white p-3 md:gap-4 md:p-4"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.productId}`} className="flex-1">
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                          <ImageFallback
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Controls on right */}
                      <div className="flex flex-col items-center gap-6">
                        {/* Size and Color together */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-xs font-medium md:h-10 md:w-10 md:text-sm">
                            {item.size}
                          </div>
                          <div
                            className="h-8 w-8 rounded border-2 border-gray-300 md:h-10 md:w-10"
                            style={{ backgroundColor: item.color.value }}
                          />
                        </div>

                        {/* Quantity */}
                        <QuantityControl
                          quantity={item.quantity}
                          onDecrease={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color.value,
                              item.quantity - 1,
                            )
                          }
                          onIncrease={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color.value,
                              item.quantity + 1,
                            )
                          }
                        />

                        {/* Delete button */}
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.size, item.color.value)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Product name and price at bottom */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="text-sm font-semibold hover:underline md:text-base">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="text-sm font-semibold md:text-base">
                        € {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg bg-white p-4 md:p-6">
                <h2 className="mb-4 text-xl font-semibold uppercase">Résumé de la commande</h2>

                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">€ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">Gratuite</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">€ {getTotal().toFixed(2)}</span>
                </div>

                <button
                  className="mt-6 w-full rounded-md bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                  onClick={handleCheckout}
                >
                  Passer la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
