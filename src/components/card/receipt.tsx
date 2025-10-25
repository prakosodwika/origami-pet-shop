import { ReactNode } from "react"
import { OrderInfo, OrderInfoLoading } from "../section/header/OrderInfo"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowUpRight, Eye } from "lucide-react"
import Link from "next/link"

type ReceiptCardProps = {
  id: number
  order_id: string,
  order_placed: string,
  total: string,
  ship_to: string,
  estimated_delivery: string
  show_receipt: boolean
  children: ReactNode
}

const ReceiptCard = ({
  id,
  order_id,
  order_placed,
  total,
  ship_to,
  estimated_delivery,
  show_receipt,
  children
}: ReceiptCardProps) => {
  return (
    <Card className="pt-0 ">
      <CardHeader className="border-b !py-5 px-7">
        <div className="flex justify-between">
          <OrderInfo label="Order ID" value={order_id} />
          <OrderInfo label="Order placed" value={order_placed} />
          <OrderInfo label="Total" value={total} />
          <OrderInfo label="Ship to" value={ship_to} />
          <OrderInfo label="Estimated delivery" value={estimated_delivery} />
          {
            show_receipt && (
              <Button asChild variant="outline" className="cursor-pointer">
                <Link href={`/order-receipt/${id}`} >
                  Open Receipt <ArrowUpRight />
                </Link>
              </Button>
            )
          }
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {children}
      </CardContent>
    </Card>
  )
}

const ReceiptCardLoading = ({children}: {children: ReactNode}) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex gap-2">
        <OrderInfoLoading />
        <OrderInfoLoading />        
        <OrderInfoLoading />
        <OrderInfoLoading />
        <OrderInfoLoading />
      </div>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}

export { ReceiptCard, ReceiptCardLoading }