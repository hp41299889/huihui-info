export interface Client {
  [key: string]: string | number;
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  birth: string;
  note: string;
}

export interface Product {
  [key: string]: string | number;
  uid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  note: string;
}

export interface Order {
  [key: string]: any;
  uid: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  note: string;
  client: { name: string };
  clientId: number;
  orderProducts: OrderProduct[];
}

interface OrderProduct {
  productUid: string;
  amount: number;
}
