export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: Array<{ name: string; value: string }>;
  sizes: string[];
  images: string[];
  category?: 'men' | 'women' | 'kids';
}

export const products: Product[] = [
  {
    id: 1,
    name: 'CHEMISE IMPRIMÉE ABSTRAITE',
    price: 99,
    description: 'Chemise coupe décontractée. Col camp et manches courtes. Boutonnage devant.',
    colors: [
      { name: 'Gris clair', value: '#D3D3D3' },
      { name: 'Gris foncé', value: '#696969' },
      { name: 'Noir', value: '#000000' },
      { name: 'Menthe clair', value: '#B2F5EA' },
      { name: 'Blanc', value: '#FFFFFF' },
      { name: 'Bleu clair', value: '#BFDBFE' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmxhY2slMjBqYWNrZXR8ZW58MXx8fHwxNzYzNTY3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1630603385875-6d1fe4fafd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc2MzQ3NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvZXN8ZW58MXx8fHwxNzYzNTYxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1542702942-161ceb2e3d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjBncmVlbnxlbnwxfHx8fDE3NjM1NjcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 2,
    name: 'Ensemble Streetwear Urbain',
    price: 129,
    description: 'Chemise coupe décontractée. Col camp et manches courtes. Boutonnage devant.',
    colors: [
      { name: 'Gris clair', value: '#D3D3D3' },
      { name: 'Gris foncé', value: '#696969' },
      { name: 'Noir', value: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1630603385875-6d1fe4fafd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc2MzQ3NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    category: 'men',
  },
  {
    id: 3,
    name: 'Chaussures en Cuir Premium',
    price: 159,
    description: 'Chemise coupe décontractée. Col camp et manches courtes. Boutonnage devant.',
    colors: [
      { name: 'Noir', value: '#000000' },
      { name: 'Marron', value: '#8B4513' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvZXN8ZW58MXx8fHwxNzYzNTYxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    category: 'men',
  },
  {
    id: 4,
    name: 'Baskets Colorblock',
    price: 119,
    description: 'Chemise coupe décontractée. Col camp et manches courtes. Boutonnage devant.',
    colors: [
      { name: 'Vert', value: '#10B981' },
      { name: 'Bleu', value: '#3B82F6' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      'https://images.unsplash.com/photo-1542702942-161ceb2e3d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjBncmVlbnxlbnwxfHx8fDE3NjM1NjcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 5,
    name: 'Veste Utilitaire Olive | Homme',
    price: 149,
    description: 'Veste utilitaire en olive. Coupe moderne et fonctionnelle.',
    colors: [
      { name: 'Olive', value: '#808000' },
      { name: 'Noir', value: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1679072961019-f9d39db93c8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjB0c2hpcnQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzU2NzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    category: 'men',
  },
  {
    id: 6,
    name: 'Coupe Droite Décontractée | Blanc',
    price: 99,
    description: 'Coupe droite décontractée en blanc. Style moderne et confortable.',
    colors: [
      { name: 'Blanc', value: '#FFFFFF' },
      { name: 'Noir', value: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvb2RpZSUyMGZhc2hpb258ZW58MXx8fHwxNzYzNTM2NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    category: 'women',
  },
  {
    id: 7,
    name: 'Coupe Droite Surdimensionnée | Beige',
    price: 109,
    description: 'Coupe droite surdimensionnée en beige. Style décontracté et tendance.',
    colors: [
      { name: 'Beige', value: '#F5F5DC' },
      { name: 'Gris', value: '#808080' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1746216845602-336ad3a744f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRzaGlydCUyMGNhc3VhbHxlbnwxfHx8fDE3NjM1NjcxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    category: 'men',
  },
];

