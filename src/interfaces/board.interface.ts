export interface IBoard {
  id: number;
  title: string;
  position: number;
}

export interface ICreateBoard {
  title: string;
  position?: number;
  id?: number;
}
