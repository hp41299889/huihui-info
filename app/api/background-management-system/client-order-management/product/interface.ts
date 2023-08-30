export interface Product extends PostProduct {
  [key: string]: any;
  uid: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostProduct extends PatchProduct {
  name: string;
  price: number;
  note?: string;
}

export interface PatchProduct {
  name?: string;
  price?: number;
  note?: string;
}
