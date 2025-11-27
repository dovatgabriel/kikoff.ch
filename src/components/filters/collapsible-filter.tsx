import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleFilterProps {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleFilter = ({ title, children }: CollapsibleFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold uppercase"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

