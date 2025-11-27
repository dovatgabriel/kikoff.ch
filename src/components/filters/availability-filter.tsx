interface AvailabilityFilterProps {
  inStock: boolean;
  outOfStock: boolean;
  inStockCount: number;
  outOfStockCount: number;
  onInStockToggle: () => void;
  onOutOfStockToggle: () => void;
}

export const AvailabilityFilter = ({
  inStock,
  outOfStock,
  inStockCount,
  outOfStockCount,
  onInStockToggle,
  onOutOfStockToggle,
}: AvailabilityFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase">Disponibilité</h3>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={onInStockToggle}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm">En stock ({inStockCount})</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={outOfStock}
            onChange={onOutOfStockToggle}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm">Rupture de stock ({outOfStockCount})</span>
        </label>
      </div>
    </div>
  );
};

