import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageFallback } from '@/components/figma/image-fallback';

interface ProductCardProps {
  id: number;
  name: string;
  price: number | string;
  image: string;
  aspectRatio?: 'square' | 'portrait';
  onRemove?: () => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  aspectRatio = 'square',
  onRemove,
}: ProductCardProps) => {
  const priceValue = typeof price === 'string' ? price : `€ ${price}`;
  const aspectClass = aspectRatio === 'portrait' ? 'aspect-3/4' : 'aspect-square';

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="cursor-pointer">
        <div className={`mb-3 ${aspectClass} overflow-hidden rounded-lg bg-gray-100`}>
          <ImageFallback
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h4 className="mb-1 text-sm font-medium">{name}</h4>
        <p className="text-sm font-semibold">{priceValue}</p>
      </Link>
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="absolute right-2 top-2 z-10 text-red-500 transition-opacity hover:text-red-700 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Retirer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

