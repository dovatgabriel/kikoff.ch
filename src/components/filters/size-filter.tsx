interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
}

export const SizeFilter = ({ sizes, selectedSizes, onSizeToggle }: SizeFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase">Taille</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeToggle(size)}
            className={`rounded-md border-2 px-3 py-1.5 text-sm font-medium transition-all ${
              selectedSizes.includes(size)
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

