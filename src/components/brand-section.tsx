import { Heart } from 'lucide-react';

export const BrandSection = () => {
  return (
    <section className="border-t bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Texte à gauche */}
          <div className="mb-8 md:mb-0">
            <p className="mb-2 text-sm text-gray-500">Kikoff.ch</p>
            <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              Made with <Heart size={17} /> in Switzerland
            </p>
            <a className="text-muted-foreground text-xs underline" href="/dashboard">
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
