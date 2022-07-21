import { IBrand } from './brands.interfaces';
import { ICategory } from './category.interfaces';

export interface IAttribute {
  name: string;
  description: string;
}

export interface IPrice {
  count: number;
  discount: number;
  discountFrom: number;
  discountPeriod: number;
}

export interface IProduct {
  name: string;
  subtitle: string;
  introduction: string;
  expertcheckDescription?: string;
  specification: string;
  // viewpoints: any;
  // questions: any;
  active: boolean;
  available: boolean;
  images: Array<string>;
  links: Array<string>;
  categoriesIds: string[];
  attributes: Array<IAttribute>;
  brandsIds: Array<IBrand>;
  price: number;
}
