import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { Cart } from "@/types/cart"
import { formatCurrency } from "@/lib/common"
import { Badge } from "../ui/badge"

type CartCardProps = {
  cart: Cart
}

const CartCard = ({ cart }: CartCardProps) => {
  const priceDiscount = cart.products.price - ((cart.products.price * cart.products.discount) / 100);
  
  return (
    <Card className="p-0 overflow-hidden">
      <CardContent className="p-2 flex gap-3 w-full">
        <div className="h-25 aspect-square items-center border-1 rounded-lg bg-gray-50 my-auto">
          <AspectRatio ratio={1/1}>
            <Image src="/mammals/raccon.svg" alt="raccon" className="object-cover" fill/>
          </AspectRatio>
        </div>

        <div className="flex justify-between py-2 pe-2 gap-2 w-full flex-1 min-w-0">
          <div className="flex flex-col gap-1 min-w-0">
            <h6 className="font-semibold truncate">{cart.products.name} testing testing testing testing</h6>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-light">SKU: {cart.products.sku}</p>
              {cart.products.discount > 0 && (<Badge variant="destructive">SAVE {cart.products.discount}%</Badge>)}
            </div>
            <p className="text-sm font-light">Category: {cart.products.categories.name}</p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-2 justify-end items-center">
              <Input type="number" defaultValue={cart.quantity} className="w-16 text-right"/>
              <Button variant="outline" size={'icon'} >
                <Trash/>
              </Button>
            </div>
            <div className="flex justify-end items-baseline gap-2">
              {cart.products.discount > 0 && (
                <p className="text-sm font-light line-through text-muted-foreground">{formatCurrency(cart.products.price)}</p>
              )}
              <p className="text-end">{formatCurrency(priceDiscount)}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default CartCard