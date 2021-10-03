import type { ICreateProduct, IProduct } from "../interfaces/product.interface";
import { supabase } from "./supabaseConfig";

export const getProducts = async () => {
  const { body, error } = await supabase
    .from<IProduct>("products")
    .select("*")
    .order("created_at");
  if (error) {
    console.log(error);
  }
  return body;
};

export const getProductById = async (id: string) => {
  const { body } = await supabase
    .from<IProduct>("products")
    .select("*")
    .eq("id", id)
    .single();
  return body;
};

export const createProduct = async (board: ICreateProduct) => {
  const { body, error } = await supabase.from<IProduct>("products").insert(board);
  if (error) {
    console.log(error);
  }
  return body[0];
};

export const updateBoard = async (board: Partial<ICreateProduct>) => {
  const { body } = await supabase
    .from<IProduct>("products")
    .update(board)
    .match({ id: board.id });
  return body[0];
};
