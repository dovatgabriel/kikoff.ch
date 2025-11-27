import { Link } from 'react-router-dom';
import { ImageFallback } from '@/components/figma/image-fallback';

interface ProductCardProps {
  id: number;
  name: string;
  price: number | string;
  image: string;
  aspectRatio?: 'square' | 'portrait';
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  aspectRatio = 'square',
}: ProductCardProps) => {
  const priceValue = typeof price === 'string' ? price : `€ ${price}`;
  const aspectClass = aspectRatio === 'portrait' ? 'aspect-3/4' : 'aspect-square';

  return (
    <Link to={`/product/${id}`} className="group cursor-pointer">
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
  );
};

