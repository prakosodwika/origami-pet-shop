import { Address } from "@/types/address";
import supabase from "../supabase/client";

export async function getAddresses(): Promise<Address[]> {
  const {data, error} = await supabase
    .from("addresses")
    .select("*");

  if (error) throw error;
  return data;
}