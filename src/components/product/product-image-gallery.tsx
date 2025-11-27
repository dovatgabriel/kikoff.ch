import { useState } from 'react';
import { ImageFallback } from '@/components/figma/image-fallback';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Main image */}
      <div className="flex-1 aspect-square overflow-hidden rounded-lg bg-gray-100">
        <ImageFallback
          src={images[selectedImageIndex]}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail images */}
      <div className="flex flex-row gap-2 md:flex-col">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`aspect-square w-16 overflow-hidden rounded-lg border-2 transition-all md:w-20 ${
              selectedImageIndex === index
                ? 'border-black'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <ImageFallback
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

