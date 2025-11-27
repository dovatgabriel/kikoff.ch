interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase">Taille</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-500'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

