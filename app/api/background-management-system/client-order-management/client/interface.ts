export interface PostClient {
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
