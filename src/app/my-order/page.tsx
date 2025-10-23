"use client"

import {OrderCard, OrderCardLoading} from "@/components/card/Order"
import {ReceiptCard, ReceiptCardLoading} from "@/components/card/receipt"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import OrderRouteHeader from "@/components/section/header/OrderRoute"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/common"
import { getTransactionLines, getTransactions } from "@/lib/fetchers/transactionFetcher"
import { TransactionLines } from "@/types/transactionLines"
import { Transaction } from "@/types/transactions"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const titleString = "My Order"
const descriptionString = "Here’s a quick look at your recent orders."
type TransactionWithLines = Transaction & { transaction_lines: TransactionLines[] };

const myOrder = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionWithLines[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const dataTransactions = await getTransactions();
        const transactionsWithLines = await Promise.all(
          dataTransactions.map(async (trx) => {
            const lines = await getTransactionLines(trx.id);
            return { ...trx, transaction_lines: lines };
          })
        );

        setTransactions(transactionsWithLines);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <div className="w-3/4 flex flex-col gap-5 mx-auto">
        <OrderRouteHeader title={titleString} description={descriptionString}>
          {!loading && 
            <Button asChild variant="outline" className="bg-blue-500 text-white">
              <Link href="/">
                <ShoppingBag /> Continue Shopping
              </Link>
            </Button>
          }
        </OrderRouteHeader>
        <div className="flex flex-col gap-10 w-full py-5">
          {loading 
            ? [...Array(2)].map((_, i) => 
                <ReceiptCardLoading key={i}>
                  {[...Array(2)].map((_, i) => <OrderCardLoading key={i} />)}
                </ReceiptCardLoading>
              )
            : transactions.map((transaction, ri) =>
              <ReceiptCard
                key={ri}
                id={transaction!.id}
                order_id={transaction!.order_id}
                order_placed={formatDate(transaction!.order_placed)}
                total={formatCurrency(transaction!.total)}
                ship_to={transaction!.addresses.name}
                estimated_delivery={formatDate(transaction!.estimated_delivery)}
                show_receipt={true}
              >
                {transaction.transaction_lines.map((trxLine, oi) => <OrderCard key={oi} cart={trxLine} />)}
              </ReceiptCard>
              )
          }
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default myOrder