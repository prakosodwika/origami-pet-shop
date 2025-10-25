import Link from "next/link"
import CartCard from "../card/Cart"
import { Button } from "../ui/button"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { Skeleton } from "../ui/skeleton"
import { Cart } from "@/types/cart"

interface CartSheetContentProps {
  carts: Cart[]
}

const CartSheetContent = ({ carts }: CartSheetContentProps) => {
  return (
    <SheetContent className="w-[600px] sm:max-w-[600px] font-nunito text-base font-normal" autoFocus={false}>
      <SheetHeader className="border-b">
        <SheetTitle>Cart</SheetTitle>
        <SheetDescription>
          Review your order before proceeding to checkout.
        </SheetDescription>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-4 px-4">
        {carts.map((item, i) => (
          <CartCard key={i} cart={item} />
        ))}
      </div>
      <SheetFooter className="border-t">
        <div className="flex justify-between gap-2">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Clear Cart</Button>
          <Button  asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/checkout/order-summary" >Checkout</Link>
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

const CartSheetLoading = () => {
  return (
    <SheetContent className="w-[600px] sm:max-w-[600px] font-nunito text-base font-normal">
      <SheetHeader className="border-b">
        <SheetTitle>Cart</SheetTitle>
        <SheetDescription>
          Review your order before proceeding to checkout.
        </SheetDescription>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-3 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-50 h-20 aspect-square"/>
            <div className="w-full flex justify-between gap-2 ">
              <div className="flex flex-col w-2/3 gap-2">
                <Skeleton className="w-full h-5"/>
                <Skeleton className="w-1/2 h-5"/>
                <Skeleton className="w-1/3 h-5"/>
              </div>
              <div className="flex flex-col w-1/3 gap-2 items-end">
                <Skeleton className="w-full h-10"/>
                <Skeleton className="w-1/2 h-5"/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SheetFooter className="border-t">
        <div className="flex justify-between gap-2">
          <Skeleton className="w-1/5 h-10"/>
          <Skeleton className="w-4/5 h-10"/>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

export {CartSheetContent, CartSheetLoading}