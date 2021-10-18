import type { ICreateProduct, IProduct } from "../interfaces/product.interface";
import { supabase } from "./supabaseConfig";

export const getProducts = async () => {
  const { body, error } = await supabase
    .from<IProduct>("products")
    .select("*")
    .order("created_at")
    .limit(20);
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

export const createProduct = async (product: ICreateProduct) => {
  const { body, error } = await supabase
    .from<IProduct>("products")
    .insert(product);
  if (error) {
    console.log(error);
  }
  return body[0];
};

export const updateProduct = async (product: Partial<IProduct>) => {
  const { error, body } = await supabase
    .from<IProduct>("products")
    .update(product)
    .eq("id", product.id);
  if (error) {
    console.log(error);
  }
  return body;
};

export const deleteProduct = async (id: number) => {
  const { error, body } = await supabase
    .from<IProduct>("products")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
  }
  return body;
};
