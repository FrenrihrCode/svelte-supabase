import type { ICreateBoard } from "../interfaces/board.interface";
import { supabase } from "./supabaseConfig";

const getAllBoards = async () => {
  const { body } = await supabase.from("boards").select("*").order("position");
  return body;
};

const getBoardById = async (id: string) => {
  const { body } = await supabase
    .from("boards")
    .select("id, title")
    .eq("id", id)
    .order("position")
    .single();
  return body;
};

const createBoard = async (board: ICreateBoard) => {
  const { body } = await supabase.from("boards").insert(board);
  return body[0];
};

const updateBoard = async (board: ICreateBoard) => {
  const { body } = await supabase
    .from("boards")
    .update({ title: board.title })
    .match({ id: board.id });
  return body[0];
};
