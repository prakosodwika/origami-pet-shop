import { Wishlist } from "@/types/wishlist";
import supabase from "../supabase/client";

export async function getWishlists(): Promise<Wishlist[]> {
  const { data, error } = await supabase
    .from("wishlists")
    .select(`*,
      products (
        id,
        sku,
        name,
        image_path,
        price,
        discount,
        rating,
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