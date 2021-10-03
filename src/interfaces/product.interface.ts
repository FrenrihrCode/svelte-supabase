export interface IProduct {
  id: number;
  created_at: Date;
  name: string;
  description: string;
  category: string;
  available: boolean;
  img?: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  category: string;
  id?: number;
  available?: boolean;
  img?: string;
}
