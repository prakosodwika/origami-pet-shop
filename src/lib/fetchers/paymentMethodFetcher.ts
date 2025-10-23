import supabase from "../supabase/client";
import { PaymentMethod } from "@/types/paymentMethod";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const {data, error} = await supabase
    .from("payment_methods")
    .select("*");

  if (error) throw error;
  return data;
}