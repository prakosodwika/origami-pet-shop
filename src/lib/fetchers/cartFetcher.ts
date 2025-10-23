import { Cart } from "@/types/cart";
import supabase from "../supabase/client";

export async function getCarts(): Promise<Cart[]> {
  const { data, error } = await supabase
    .from("carts")
    .select(`*,
      products (
        id,
        sku,
        name,
        image_path,
        price,
        discount,
        available,
        category_id,
        categories (
          id,
          name
        )
      )
    `);

  if (error) throw error
  return data
}