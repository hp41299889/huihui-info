export interface PostOrder {
  clientId: string | number;
  date: string;
  note?: string;
  orderProducts: ProductListItem[];
}

export interface PatchOrder {
  clientId?: string | number;
  date?: string;
  note?: string;
  orderProducts?: ProductListItem[];
}

interface ProductListItem {
  productUid: string;
  amount: string | number;
  note?: string;
}
