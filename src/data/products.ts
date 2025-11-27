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
    name: 'T-SHIRT SPORT TECHNIQUE',
    price: 99,
    description: 'T-shirt technique respirant. Matière légère et séchage rapide. Idéal pour l\'entraînement et le sport.',
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
      'https://images.pexels.com/photos/12039633/pexels-photo-12039633.jpeg',
      'https://images.pexels.com/photos/8980781/pexels-photo-8980781.jpeg',
      'https://images.pexels.com/photos/5464923/pexels-photo-5464923.jpeg',
    ],
  },
  {
    id: 2,
    name: 'BASKETS SPORT COLORBLOCK',
    price: 119,
    description: 'Baskets sport légères et confortables. Design moderne avec technologie d\'amortissement. Idéales pour tous types d\'activités.',
    colors: [
      { name: 'Vert', value: '#10B981' },
      { name: 'Bleu', value: '#3B82F6' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg',
      'https://images.pexels.com/photos/31507742/pexels-photo-31507742.jpeg',
      'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg',
    ],
  },
  
  {
    id: 3,
    name: 'CHAUSSURES DE SPORT PREMIUM',
    price: 159,
    description: 'Chaussures de sport haute performance. Semelle amortissante et support optimal. Parfaites pour la course et le fitness.',
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
    name: 'PANTALON SPORT TECHNIQUE | Beige',
    price: 109,
    description: 'Pantalon sport technique avec coupe ajustée. Matière stretch et poches zippées. Idéal pour le running et le fitness.',
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
  
  {
    id: 5,
    name: 'VESTE SPORT TECHNIQUE | Homme',
    price: 149,
    description: 'Veste sport technique imperméable et respirante. Protection contre les intempéries. Parfaite pour l\'entraînement en extérieur.',
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
    id: 5,
    name: 'SHORT SPORT PERFORMANCE | Blanc',
    price: 99,
    description: 'Short sport performance avec doublure intégrée. Matière stretch et évacuation de l\'humidité. Confort optimal pour le sport.',
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
  
];

