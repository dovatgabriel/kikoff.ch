export interface ProductColor {
  name: string;
  value: string; // hex code
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2X';

export type ProductCategory = 'men' | 'women' | 'kids';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[] | string[];
  images: string[];
  category?: ProductCategory;
  weekly?: boolean;
}

export type CheckoutItem = {
  productId: string;
  quantity: number;
};
