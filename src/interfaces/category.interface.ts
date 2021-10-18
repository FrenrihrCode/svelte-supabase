export interface ICategory {
  id: number;
  name: string;
  description: string;
  created_at: Date;
}

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IUpdateCategory {
  id: number;
  name?: string;
  description?: string;
}
