export interface PostProduct {
  name: string;
  price: number;
  note?: string;
}

export interface PatchProduct {
  name?: string;
  price?: number;
  note?: string;
}
