import { Product } from "@/types/product";
import supabase from "../supabase/client";

export async function getProducts(
  page: number = 1, 
  itemsPerPage: number = 10,
  category: string = "all",
  search: string = ""
): Promise<Product[]> {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  let query =  supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)
    .range(start, end)
    .order("id", { ascending: true });

  if (category !== "all") {
    query = query.eq("category_id", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error.message, error.details);
    throw error;
  }
  return data
}

export async function getProductCount(category: string = "all", search: string = ""): Promise<number> {
  let query = supabase.from("products").select("*", { count: "exact", head: true });

  if (category !== "all") {
    query = query.eq("category_id", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { count, error } = await query;
  if (error) throw error;
  return count || 0;
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function  getPopularProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)
    .order('rating', { ascending: false })
    .limit(5)

  if (error) throw error
  return data
}

export async function getNewProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) throw error
  return data
}

export async function getLimitedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)
    .gt('discount', 0)
    .order('discount', { ascending: false })
    .limit(5)

  if (error) throw error
  return data
}

export async function getSpecialProducts(): Promise<(Product & { special: number })[]> {
  const {data, error} = await supabase
    .from("products")
    .select(`*,
      categories (
        id,
        name,
        image_path
      )
    `)

  if (error) throw error

  const productsWithSpecial = data
    .map((item) => {
      const special = item.price - (item.price * item.discount / 100)
      return {
        ...item,
        special: parseFloat(special.toFixed(2))
      }
    })
    .sort((a, b) => a.special - b.special)
    .slice(0, 4)

  return productsWithSpecial
}