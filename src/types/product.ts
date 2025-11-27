export interface BaseProduct {
  id: number;
  name: string;
  price: string | number;
  image: string;
}

export interface ProductWithCategory extends BaseProduct {
  category: 'all' | 'men' | 'women' | 'kids';
}

