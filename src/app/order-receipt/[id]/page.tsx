import {OrderCard} from "@/components/card/Order"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/common"
import { getTransactionById, getTransactionLines } from "@/lib/fetchers/transactionFetcher"
import { ListCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type OrderReceiptProps = {
  params: { id: string }
}

const orderReceipt = async ({params}: OrderReceiptProps) => {
  const id = Number(params.id)

  const transaction = await getTransactionById(id)
  const transactionLines = await getTransactionLines(transaction.id)

  return (
    <div className="container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <div className="w-2/4 flex flex-col gap-5 mx-auto">
        <Card className="border-t-8 border-t-blue-200">
          <CardContent className="flex flex-col gap-8">
            <div className="flex justify-center items-center gap-2 mt-5">
              <Image src="/logo/dark.svg" alt="raccon" className="aspect-1/1 object-cover " width={30} height={30}/>
              <h4 className="text-xl font-bold">PETIFY</h4>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-semibold">Order Confirmation</h3>
              <p className="text-sm font-light">Thank you! Your order <span className="font-semibold">{transaction.order_id}</span> is confirmed and being processed.</p>
            </div>

            <div className="flex flex-col gap-5">
              {transactionLines.map((trxLine, i) => <OrderCard key={i} cart={trxLine} />)}
            </div>

            <Card className="bg-gray-50">
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-xs font-light">Order placed</p>
                  <p className="text-sm font-semibold">{formatDate(transaction.order_placed)}</p>
                </div>
                <div>
                  <p className="text-xs font-light">Total</p>
                  <p className="text-sm font-semibold">{formatCurrency(transaction.total)}</p>
                </div>
                <div>
                  <p className="text-xs font-light">Ship to</p>
                  <p className="text-sm font-semibold">{transaction.addresses.name}</p>
                </div>
                <div>
                  <p className="text-xs font-light">Estimated Delivery</p>
                  <p className="text-sm font-semibold">{formatDate(transaction.estimated_delivery)}</p>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild className="w-fit mx-auto" variant="outline">
              <Link href="/my-order">
                <ListCheck /> My Orders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer className="mt-auto"/>
    </div>
  )
}

export default orderReceipt