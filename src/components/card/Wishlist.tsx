import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart, Star, Trash } from "lucide-react"
import { Badge } from "../ui/badge"
import { Wishlist } from "@/types/wishlist"
import { formatCurrency } from "@/lib/common"

type WishlistCardProps = {
  wishlist: Wishlist
}

const WishlistCard = ({ wishlist }: WishlistCardProps) => {
  const priceDiscount = wishlist.products.price - ((wishlist.products.price * wishlist.products.discount) / 100);

  return (
    <Card className="p-0 overflow-hidden">
      <CardContent className="p-2 flex gap-3 w-full">
        <div className="h-full aspect-square items-center border-1 rounded-lg dark:bg-zinc-800 bg-gray-50 my-auto">
          <AspectRatio ratio={1 / 1}>
            <Image src={wishlist.products.image_path} alt={wishlist.products.name} className="object-cover" fill />
          </AspectRatio>
        </div>

        <div className="flex flex-col justify-between py-2 pe-2 gap-2 w-full flex-1 min-w-0">
          <div className="flex justify-between min-w-0">
            <div className="flex flex-col gap-1 min-w-0">
              <h6 className="font-semibold truncate">{wishlist.products.name}</h6>
              <div className="flex items-center gap-2">
                <p className="">{formatCurrency(priceDiscount)}</p>
                {wishlist.products.discount > 0 && (
                  <p className="text-sm font-light line-through text-muted-foreground">{formatCurrency(wishlist.products.price)}</p>
                )}
              </div>
            </div>
            <div>
              {wishlist.products.discount > 0 && (<Badge className="text-xs bg-red-600 text-white">SAVE {wishlist.products.discount}%</Badge>)}
            </div>
          </div>

          <div className="flex justify-between items-end flex-wrap gap-2">
            <div className="flex gap-1 items-center">
              <Badge className="text-xs bg-yellow-400 text-white">
                <Star className="fill-white border-white"  />
                {wishlist.products.rating}
              </Badge>
              <p className="text-sm font-light">Type: <span className="font-semibold">{wishlist.products.categories.name}</span></p>
            </div>
            <div className="flex gap-1 items-center justify-end">
              <Button variant="outline" >
                <ShoppingCart />
                Add
              </Button>
              <Button variant="outline" size={'icon'}>
                <Trash />
              </Button>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default WishlistCard