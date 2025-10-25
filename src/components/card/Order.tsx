import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent } from "../ui/card"
import { Cart } from "@/types/cart"
import { formatCurrency } from "@/lib/common"
import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"

interface OrderCardProps {
  cart: Cart
}

const OrderCard = ({ cart }: OrderCardProps) => {
  const priceDiscount = cart.products.price - ((cart.products.price * cart.products.discount) / 100);
  const totalPriceWithoutDiscount = cart.products.price * cart.quantity;
  const totalPrice = priceDiscount * cart.quantity;

  return (
    <Card className="p-0">
      <CardContent className="p-2 flex gap-3 w-full">
        <div className="h-25 aspect-square items-center border-1 rounded-lg dark:bg-zinc-800 bg-gray-50 my-auto">
          <AspectRatio ratio={1 / 1}>
            <Image src={cart.products.image_path} alt={cart.products.name} className="object-cover" fill />
          </AspectRatio>
        </div>

        <div className="flex justify-between py-2 pe-2 gap-2 w-full">
          <div className="flex flex-col gap-1">
            <h6 className="font-semibold">{cart.products.name}</h6>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-light">SKU: {cart.products.sku}</p>
              {cart.products.discount > 0 && (<Badge className="bg-red-600 text-white px-4 py-1">SAVE {cart.products.discount}%</Badge>)}
            </div>
            <p className="text-sm font-light">Category: {cart.products.categories.name}</p>
          </div>

          <div className="flex flex-col gap-2 justify-between text-sm font-light">
            <div className="flex gap-2 justify-end items-center">
              {cart.products.discount > 0 && (
                <p className="line-through text-muted-foreground">{formatCurrency(cart.products.price)}</p>
              )}
              <p className="text-end">{formatCurrency(priceDiscount)}</p>
            </div>
            <p className="text-end">x {cart.quantity}</p>
            <div className="flex justify-end items-baseline gap-1">
              {cart.products.discount > 0 && (
                <p className="line-through text-muted-foreground">{formatCurrency(totalPriceWithoutDiscount)}</p>
              )}
              <p className="text-end font-semibold">{formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

const OrderCardLoading = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="w-50 h-25 aspect-square" />
      <div className="w-full flex justify-between gap-2 py-2 pe-2">
        <div className="flex flex-col w-2/3 gap-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
        <div className="flex flex-col w-1/3 gap-2 items-end justify-between">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/5 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
    </div>
  )
}

export { OrderCard, OrderCardLoading }