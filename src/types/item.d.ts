export interface Item {
  id: string;
  picture: string;
  title: string;
  price: string;
  category: Category;
}

export type Category = 'footwear' | 'apparel' | 'equipment' | 'deals';
