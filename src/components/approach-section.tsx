import { ImageFallback } from '@/components/figma/image-fallback';

interface ApproachSectionProps {
  images: string[];
}

export const ApproachSection = ({ images }: ApproachSectionProps) => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Titre et description */}
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-4xl font-bold">OUR APPROACH TO FASHION DESIGN</h3>
          <p className="mx-auto max-w-3xl text-gray-600">
            At the heart of our ethos is a commitment to sustainable fashion that doesn't compromise
            on style. We believe in creating timeless pieces that transcend seasonal trends, crafted
            with care and designed to last.
          </p>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="col-span-2 row-span-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <ImageFallback
                src={images[0]}
                alt="Fashion approach 1"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageFallback
              src={images[1]}
              alt="Fashion approach 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageFallback
              src={images[2]}
              alt="Fashion approach 3"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageFallback
              src={images[3]}
              alt="Fashion approach 4"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageFallback
              src={images[4] || images[1]}
              alt="Fashion approach 5"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
