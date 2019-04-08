import { Category } from './category';

export class Product {
  sku: string;
  name: string;
  type: string;
  price: number;
  upc: string;
  shipping: number;
  description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
  category: Category[];
}
