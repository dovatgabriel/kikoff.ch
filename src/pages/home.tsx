import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { WeeklyProducts } from '@/components/weekly-products';
import { CollectionsSection } from '@/components/collection-section';
import { ApproachSection } from '@/components/approach-section';
import { BrandSection } from '@/components/brand-section';
import { products } from '@/data/products';

const weeklyProducts = products.slice(0, 4).map((p) => ({
  id: p.id,
  name: p.name,
  price: `€ ${p.price}`,
  image: p.images[0],
}));

const collectionProducts = products
  .filter((p) => p.category)
  .map((p) => ({
    id: p.id,
    name: p.name,
    price: `€ ${p.price}`,
    image: p.images[0],
    category: p.category!,
  }));

const approachImages = [
  'https://images.unsplash.com/photo-1763034281415-568de1708f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzU2NzEyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1538329972958-465d6d2144ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM1NDA5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1762395271659-9465152c7e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MzQ5NzAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1544138808-67b789cf1e1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNjM0ODM1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBjYXN1YWx8ZW58MXx8fHwxNzYzNDU0NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <HeroSection
          image1="https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmxhY2slMjBqYWNrZXR8ZW58MXx8fHwxNzYzNTY3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          image2="https://images.unsplash.com/photo-1542702942-161ceb2e3d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjBncmVlbnxlbnwxfHx8fDE3NjM1NjcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          image3="https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBjYXN1YWx8ZW58MXx8fHwxNzYzNDU0NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <WeeklyProducts products={weeklyProducts} />
        <CollectionsSection products={collectionProducts} />
        <ApproachSection images={approachImages} />
        <BrandSection />
      </div>
    </div>
  );
};
