import type {
  ICategory,
  ICreateCategory,
} from "../interfaces/category.interface";
import { supabase } from "./supabaseConfig";

export const getCategories = async () => {
  const { body, error } = await supabase
    .from<ICategory>("categories")
    .select("*")
    .order("created_at")
    .limit(20);
  if (error) {
    console.log(error);
  }
  return body;
};

export const createCategory = async (category: ICreateCategory) => {
  const { body, error } = await supabase
    .from<ICategory>("categories")
    .insert(category);
  if (error) {
    console.log(error);
  }
  return body[0];
};

export const updateCategory = async (category: Partial<ICategory>) => {
  const { error, body } = await supabase
    .from<ICategory>("categories")
    .update(category)
    .eq("id", category.id);
  if (error) {
    console.log(error);
  }
  return body;
};
