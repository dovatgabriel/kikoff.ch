import { Heart } from 'lucide-react';

interface ProductHeaderProps {
  name: string;
  isWishlisted: boolean;
  onWishlistToggle: (value: boolean) => void;
}

export const ProductHeader = ({ name, isWishlisted, onWishlistToggle }: ProductHeaderProps) => {
  return (
    <div className="mb-4 flex items-start justify-between">
      <h1 className="text-3xl font-bold">{name}</h1>
      <button onClick={() => onWishlistToggle(!isWishlisted)} className="hover:opacity-70">
        <Heart
          className={`h-6 w-6 ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>
    </div>
  );
};

