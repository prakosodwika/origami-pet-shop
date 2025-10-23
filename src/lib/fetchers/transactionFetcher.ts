import { Transaction } from "@/types/transactions";
import supabase from "../supabase/client";
import { TransactionLines } from "@/types/transactionLines";

export async function getTransactions(): Promise<Transaction[]> {
  const {data, error} = await supabase
    .from("transactions")
    .select(`
      *,
      addresses(*),
      transaction_lines (
        id,
        quantity,
        created_at,
        products (
          id,
          name,
          price,
          image_path,
          categories (id, name)
        )
      )
    `);

  if (error) throw error
  return data
}

export async function getFirstTransaction(): Promise<Transaction> {
  const {data, error} = await supabase
    .from("transactions")
    .select(`*, addresses(
      id, name
    )`)
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) throw error
  return data[0]
}

export async function getTransactionById(id: Number): Promise<Transaction> {
  const {data, error} = await supabase
    .from("transactions")
    .select(`
      *,
      addresses (id, name)
    `)
    .eq("id", id)
    .single();

  if (error) throw error
  return data
}

export async function getTransactionLines(id: Number): Promise<TransactionLines[]> {
  const {data, error} = await supabase
    .from("transaction_lines")
    .select(`
      *,
      products (
        *,
        categories (id, name)
      )
    `)
    .eq('transaction_id', id)

  if (error) throw error
  return data
}