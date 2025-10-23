import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"
import { PaymentMethod } from "@/types/paymentMethod"
import { Skeleton } from "../ui/skeleton"

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod & { 
    index?: number 
    isFinal: boolean
  }
}

const PaymentMethodCard = ({ paymentMethod }: PaymentMethodCardProps) => {
  return (
    <Card className="w-full max-w-sm py-4">
      <CardHeader className="border-b m-0 h-10">
        <div className="flex justify-between items-center">
          <CardTitle>{paymentMethod.bank_account}</CardTitle>
          {paymentMethod.index === 0 && !paymentMethod.isFinal && (
            <Badge className="bg-green-100 px-4 py-1 text-green-500">Pay with this</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 px-4">
        <div className="h-20 aspect-square items-center border-1 rounded-lg bg-gray-50 my-auto">
          <AspectRatio ratio={1/1}>
            <Image src="/mammals/raccon.svg" alt="raccon" className="object-cover" fill />
          </AspectRatio>
        </div>
        <div className="flex flex-col p-2">
          <p className="font-semibold">{paymentMethod.account_name}</p>
          <p className="font-light text-sm">{paymentMethod.account_number}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between px-4 items-start">
        {!paymentMethod.isFinal && (
          <div className="flex gap-4">
            <Button variant="link" className="px-0 underline decoration-dashed text-xs cursor-pointer text-blue-500">Edit</Button>
            <Button variant="link" className="px-0 underline decoration-dashed text-xs cursor-pointer text-blue-500">Remove</Button>
          </div>
        )}
        {paymentMethod.index !== 0 && !paymentMethod.isFinal && (
          <Button variant={"outline"} className="text-xs cursor-pointer">Select Card</Button>
        )}
      </CardFooter>
    </Card>
  )
}

const PaymentMethodCardLoading = ({index, isFinal}: {
  index?: number,
  isFinal: boolean
}) => {
  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex justify-between items-center">
        <Skeleton className="w-1/3 h-8"/>
        {index === 0 && !isFinal && (
          <Skeleton className="w-1/4 h-6"/>
        )}
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-16 aspect-square"/>
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-1/2 h-6"/>
          <Skeleton className="w-1/3 h-5"/>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-2">
        {!isFinal && (
          <div className="flex gap-2 w-full">
            <Skeleton className="w-1/4 h-6"/>
            <Skeleton className="w-1/4 h-6"/>
          </div>
        )}
        {index !== 0 && !isFinal && (
          <Skeleton className="w-1/4 h-6"/>
        )}
      </div>
    </div>
  )
}

export {PaymentMethodCard, PaymentMethodCardLoading}