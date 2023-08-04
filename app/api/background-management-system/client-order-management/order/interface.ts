export interface PostOrder {
  clientId: number;
  date: string;
  note?: string;
  orderProducts: ProductListItem[];
}

export interface PatchOrder {
  clientId?: number;
  date?: string;
  note?: string;
  orderProducts?: ProductListItem[];
}

interface ProductListItem {
  productUid: string;
  amount: number;
  note?: string;
}
