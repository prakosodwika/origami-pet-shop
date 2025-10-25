import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"
import { formatCurrency } from "@/lib/common"
import { Address } from "@/types/address"

type SummaryCardProps = {
  route: string,
  subTotal?: number
  shippingCost?: number
  vat?: number
  address?: Address
}

const SummaryCard = ({ 
  route,
  subTotal = 0,
  shippingCost = 0,
  vat = 0,
  address
}: SummaryCardProps) => {
  const addressOn = route !== 'order' 
  const totalAmount = subTotal + shippingCost + vat;

  return (
    <Card className="w-full max-w-sm dark:bg-zinc-800 bg-gray-50">
      <CardHeader className="border-b">
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          A quick breakdown of your total cost.
        </CardDescription>
      </CardHeader>
      {addressOn && (
        <CardContent className="flex flex-col gap-2">
            <p className="font-semibold">Shipping to {address?.name}</p>
            <div className="text-sm flex flex-col gap-0.5 font-light">
              <p>{address?.recipient}</p>
              <p>{address?.postal_code + " " + address?.street}</p>
              <p>{address?.province}</p>
              <p>{address?.country}</p>
            </div>
        </CardContent>
      )}
      {addressOn && (<hr />)}
      <CardContent className="flex flex-col gap-2">
          <p className="font-semibold">Price Details</p>
          <div className="flex justify-between items-center font-light">
            <p className="text-sm">Subtotal</p>
            <p className="font-semibold">{formatCurrency(subTotal)}</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p className="text-sm">Shipping</p>
            <p className="font-semibold">{formatCurrency(shippingCost)}</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p className="text-sm">VAT</p>
            <p className="font-semibold">{formatCurrency(vat)}</p>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t font-semibold">
        <p>Total</p>
        <p>{formatCurrency(totalAmount)}</p>
      </CardFooter>
    </Card>
  )
}

const SummaryCardLoading = ({ route }: SummaryCardProps) => {
  const addressOn = route !== 'order' 

  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/3 h-8"/>
        <Skeleton className="w-1/2 h-5"/>
      </div>
      {addressOn && (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/3 h-8"/>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-2/4 h-5"/>
            <Skeleton className="w-3/4 h-5"/>
            <Skeleton className="w-3/4 h-5"/>
            <Skeleton className="w-2/4 h-5"/>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/3 h-8"/>
        <div className="flex justify-between">
          <Skeleton className="w-1/4 h-5"/>
          <Skeleton className="w-2/4 h-5"/>
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-1/4 h-5"/>
          <Skeleton className="w-2/4 h-5"/>
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-1/4 h-5"/>
          <Skeleton className="w-2/4 h-5"/>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <Skeleton className="w-1/4 h-5"/>
          <Skeleton className="w-2/4 h-5"/>
        </div>
      </div>
    </div>
  )
}

export {SummaryCard, SummaryCardLoading}