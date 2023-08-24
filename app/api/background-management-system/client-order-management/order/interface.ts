export interface Order extends PostOrder {
  [key: string]: any;
  uid: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostOrder extends PatchOrder {
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
