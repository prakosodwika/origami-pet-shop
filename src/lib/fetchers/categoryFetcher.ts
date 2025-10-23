import { Category } from "@/types/category"
import supabase from "../supabase/client"

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")

  if (error) throw error
  return data
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}