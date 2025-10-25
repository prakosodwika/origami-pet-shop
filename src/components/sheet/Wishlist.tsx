import { Wishlist } from "@/types/wishlist"
import WishlistCard from "../card/Wishlist"
import { Button } from "../ui/button"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { Skeleton } from "../ui/skeleton"

interface WishlistSheetContentProps {
  wishlists: Wishlist[]
}

const WishlistSheetContent = ({ wishlists }: WishlistSheetContentProps) => {
  return (
    <SheetContent className="w-[600px] sm:max-w-[600px] font-nunito text-base font-normal">
      <SheetHeader className="border-b">
        <SheetTitle>Wishlist</SheetTitle>
        <SheetDescription>
          Your wishlist — all your favorites in one place.
        </SheetDescription>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-4 px-4">
        {wishlists.map((item, i) => (
          <WishlistCard key={i} wishlist={item} />
        ))}
      </div>
      <SheetFooter className="border-t">
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Remove all</Button>
      </SheetFooter>
    </SheetContent>
  )
}

const WishListLoading = () => {
  return (
    <SheetContent className="w-[600px] sm:max-w-[600px] font-nunito text-base font-normal">
      <SheetHeader className="border-b">
        <SheetTitle>Wishlist</SheetTitle>
        <SheetDescription>
          Your wishlist — all your favorites in one place.
        </SheetDescription>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-3 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-50 h-20 aspect-square"/>
            <div className="w-full flex flex-col justify-between gap-2 ">
              <Skeleton className="w-full h-10"/>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-7"/>
                  <Skeleton className="w-20 h-7"/>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-7"/>
                  <Skeleton className="w-20 h-7"/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SheetFooter className="border-t">
        <Skeleton className="w-full h-10"/>
      </SheetFooter>
    </SheetContent>
  )
}

export { WishlistSheetContent, WishListLoading }