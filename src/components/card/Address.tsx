import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Address } from "@/types/address"
import { Skeleton } from "../ui/skeleton"

interface AddressCardProps {
  address: Address & { 
    index?: number 
    isFinal: boolean
  }
}

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <Card className="w-full max-w-sm py-4">
      <CardHeader className="border-b m-0 h-10">
        <div className="flex justify-between items-center">
          <CardTitle>{address.name}</CardTitle>
          {address.index === 0 && !address.isFinal && (
            <Badge className="bg-green-100 dark:bg-green-950 px-4 py-1 text-green-500">Ship here</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 ">
        <p className="font-semibold">{address.recipient}</p>
        <div className="font-light text-sm flex flex-col gap-1">
          <p>{address.postal_code + " " + address.street}</p>
          <p>{address.province}</p>
          <p>{address.country}</p>
          <p>Phone Number: +{address.phone}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 items-start">
        {!address.isFinal && (
          <div className="flex gap-4">
            <Button variant="link" className="px-0 underline decoration-dashed text-xs cursor-pointer text-blue-500">Edit</Button>
            <Button variant="link" className="px-0 underline decoration-dashed text-xs cursor-pointer text-blue-500">Remove</Button>
          </div>
        )}
        {address.index !== 0 && !address.isFinal && (
          <Button variant={"outline"} className="text-xs cursor-pointer">Select Address</Button>
        )}
      </CardFooter>
    </Card>
  )
}

const AddressCardLoading = ({index, isFinal}: {
  index?: number,
  isFinal: boolean
}) => {
  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex justify-between items-center">
        <Skeleton className="w-1/3 h-6"/>
        {index === 0 && !isFinal && (
          <Skeleton className="w-1/4 h-5"/>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/2 h-6"/>
        <Skeleton className="w-full h-4"/>
        <Skeleton className="w-1/4 h-4"/>
        <Skeleton className="w-2/4 h-4"/>
        <Skeleton className="w-3/4 h-4"/>
      </div>
      <div className="flex justify-between items-center gap-2 pt-2">
        {!isFinal && (
          <div className="flex gap-2 w-full">
            <Skeleton className="w-1/5 h-4"/>
            <Skeleton className="w-1/5 h-4"/>
          </div>
        )}
        {index !== 0 && !isFinal && (
          <Skeleton className="w-2/4 h-6"/>
        )}
      </div>
    </div>
  )
}

export {AddressCard, AddressCardLoading}