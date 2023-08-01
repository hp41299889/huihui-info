export interface Client {
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
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  note: string;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  note: string;
  clientId: number;
}
