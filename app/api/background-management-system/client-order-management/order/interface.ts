export interface Order extends PostOrder {
  [key: string]: any;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostOrder extends PatchOrder {
  clientId: number;
  date: Date;
  note?: string;
  orderProducts: ProductListItem[];
}

export interface PatchOrder {
  clientId?: number;
  date?: Date;
  note?: string;
  orderProducts?: ProductListItem[];
}

interface ProductListItem {
  productUid: string;
  amount: number;
  note?: string;
}
