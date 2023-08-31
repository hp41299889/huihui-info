export interface Client extends PostClient {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostClient extends PatchClient {
  email: string;
  name: string;
  phone: string;
  birth: Date;
  address: string;
  note?: string;
}

export interface PatchClient {
  email?: string;
  name?: string;
  phone?: string;
  birth?: Date;
  address?: string;
  note?: string;
}
