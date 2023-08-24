export interface Client extends PostClient {
  [key: string]: any;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostClient extends PatchClient {
  email: string;
  name: string;
  phone: string;
  birth: string;
  address: string;
  note?: string;
}

export interface PatchClient {
  email?: string;
  name?: string;
  phone?: string;
  birth?: string;
  address?: string;
  note?: string;
}
