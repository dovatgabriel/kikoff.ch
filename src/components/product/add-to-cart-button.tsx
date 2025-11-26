interface AddToCartButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
}

export const AddToCartButton = ({
  disabled = false,
  onClick,
  label = 'AJOUTER',
}: AddToCartButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-auto w-full rounded-md py-4 text-sm font-semibold uppercase transition-all ${
        disabled
          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );
};

