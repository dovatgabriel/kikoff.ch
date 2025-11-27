import { Plus, Minus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantityControl = ({ quantity, onDecrease, onIncrease }: QuantityControlProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onIncrease}
        className="rounded-md border border-gray-300 p-1 hover:bg-gray-100"
      >
        <Plus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button
        onClick={onDecrease}
        className="rounded-md border border-gray-300 p-1 hover:bg-gray-100"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
};

