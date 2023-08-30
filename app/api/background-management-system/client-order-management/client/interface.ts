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
  note?: string | null;
}

export interface PatchClient {
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  birth?: Date | null;
  address?: string | null;
  note?: string | null;
}
