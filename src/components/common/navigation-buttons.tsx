import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export const NavigationButtons = ({
  onPrevious,
  onNext,
  className = '',
}: NavigationButtonsProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={onPrevious}
        className="rounded-md border p-2 hover:bg-gray-100"
        aria-label="Précédent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="rounded-md border p-2 hover:bg-gray-100"
        aria-label="Suivant"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

