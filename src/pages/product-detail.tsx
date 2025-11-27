import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductHeader } from '@/components/product/product-header';
import { ColorSelector } from '@/components/product/color-selector';
import { SizeSelector } from '@/components/product/size-selector';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { products } from '@/data/products';
import { useCart } from '@/contexts/cart-context';
import { useFavorites } from '@/contexts/favorites-context';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (showAddedMessage) {
      const timer = setTimeout(() => {
        setShowAddedMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddedMessage]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex min-h-screen items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Produit introuvable</h1>
            <button
              onClick={() => navigate('/')}
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[selectedColor],
    });

    setShowAddedMessage(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Success message */}
      {showAddedMessage && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300">
          <div className="rounded-lg bg-black px-4 py-3 text-white shadow-lg whitespace-nowrap">
            <p className="text-xs font-medium sm:text-sm">Article ajouté au panier !</p>
          </div>
        </div>
      )}
      <div className="flex min-h-[calc(100vh-80px)] items-center pt-16 md:pt-32">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {/* Left side - Images */}
            <ProductImageGallery images={product.images} productName={product.name} />

            {/* Right side - Product details */}
            <div className="flex flex-col border border-gray-300 rounded-lg p-4 md:p-6">
              <ProductHeader
                name={product.name}
                isWishlisted={isFavorite(product.id)}
                onWishlistToggle={() =>
                  toggleFavorite({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                  })
                }
              />

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-semibold">€ {product.price}</p>
                <p className="text-sm text-gray-600">Prix TTC</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <ColorSelector
                colors={product.colors}
                selectedColorIndex={selectedColor}
                onColorSelect={setSelectedColor}
              />

              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />

              <AddToCartButton
                disabled={!selectedSize}
                onClick={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

