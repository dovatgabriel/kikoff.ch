import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductHeader } from '@/components/product/product-header';
import { ColorSelector } from '@/components/product/color-selector';
import { SizeSelector } from '@/components/product/size-selector';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { products } from '@/data/products';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex min-h-screen items-center justify-center">
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
    // TODO: Implement add to cart logic
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex min-h-[calc(100vh-80px)] items-center pt-24">
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left side - Images */}
            <ProductImageGallery images={product.images} productName={product.name} />

            {/* Right side - Product details */}
            <div className="flex flex-col border border-gray-300 rounded-lg p-6">
              <ProductHeader
                name={product.name}
                isWishlisted={isWishlisted}
                onWishlistToggle={setIsWishlisted}
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

