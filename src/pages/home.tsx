import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { WeeklyProducts } from '@/components/weekly-products';
import { CollectionsSection } from '@/components/collection-section';
import { ApproachSection } from '@/components/approach-section';
import { BrandSection } from '@/components/brand-section';

// Données de test
const weeklyProducts = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    price: '€ 89',
    image:
      'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmxhY2slMjBqYWNrZXR8ZW58MXx8fHwxNzYzNTY3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Urban Streetwear Set',
    price: '€ 129',
    image:
      'https://images.unsplash.com/photo-1630603385875-6d1fe4fafd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc2MzQ3NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Premium Leather Shoes',
    price: '€ 159',
    image:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvZXN8ZW58MXx8fHwxNzYzNTYxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Colorblock Sneakers',
    price: '€ 119',
    image:
      'https://images.unsplash.com/photo-1542702942-161ceb2e3d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjBncmVlbnxlbnwxfHx8fDE3NjM1NjcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const collectionProducts = [
  {
    id: 1,
    name: 'Olive Utility Jacket | Men',
    price: '€ 149',
    image:
      'https://images.unsplash.com/photo-1679072961019-f9d39db93c8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjB0c2hpcnQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzU2NzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'men' as const,
  },
  {
    id: 2,
    name: 'Casual Straight fit | White',
    price: '€ 99',
    image:
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvb2RpZSUyMGZhc2hpb258ZW58MXx8fHwxNzYzNTM2NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'women' as const,
  },
  {
    id: 3,
    name: 'Oversized Straight | Beige',
    price: '€ 109',
    image:
      'https://images.unsplash.com/photo-1746216845602-336ad3a744f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRzaGlydCUyMGNhc3VhbHxlbnwxfHx8fDE3NjM1NjcxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'men' as const,
  },
];

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
      <main>
        <HeroSection
          image1="https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmxhY2slMjBqYWNrZXR8ZW58MXx8fHwxNzYzNTY3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          image2="https://images.unsplash.com/photo-1542702942-161ceb2e3d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjBncmVlbnxlbnwxfHx8fDE3NjM1NjcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          image3="https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBjYXN1YWx8ZW58MXx8fHwxNzYzNDU0NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <WeeklyProducts products={weeklyProducts} />
        <CollectionsSection products={collectionProducts} />
        <ApproachSection images={approachImages} />
        <BrandSection />
      </main>
    </div>
  );
};
