import { Button } from "../ui/button"
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { ShoppingCart, Star, StarHalf } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { Product } from "@/types/product"
import { formatCurrency } from "@/lib/common"

type ProductSheetContentProps = {
  product: Product
}

const ProductSheetContent = ({ product }: ProductSheetContentProps) => {
  const discountPrice = product.price - ((product.price * product.discount) / 100)

  return (
    <SheetContent className="w-[500px] sm:max-w-[500px] font-nunito text-base font-normal">
      <SheetHeader className="border-b">
        <SheetTitle>Product Details</SheetTitle>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-5 px-4">
        <div className="w-full aspect-auto border-1 rounded-lg flex flex-col items-end p-2 dark:bg-zinc-900  bg-gray-50">
          {product.discount > 0 && (
            <Badge className="bg-red-600 items-center rounded-sm">SAVE {product.discount}%</Badge>
          )}
          <AspectRatio ratio={3/2}>
            <Image src={product.image_path} alt={product.name} className="object-contain" fill/>
          </AspectRatio>
        </div>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="font-light">{product.description}</p>

        <table className="text-sm border-separate border-spacing-y-3">
          <tbody className="font-light">
            <tr>
              <td className="align-top">Availability</td>
              <td className="pl-10">
                <Badge className="bg-green-200 text-green-500">
                  {product.available ? "In Stock" : "Out of Stock"}
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="align-top">SKU</td>
              <td className="pl-10 ">{product.sku}</td>
            </tr>
            <tr>
              <td className="align-top">Category</td>
              <td className="pl-10 ">{product.categories.name}</td>
            </tr>
            <tr>
              <td className="align-top">Rating</td>
              <td className="flex pl-10 gap-2">
                <p className="">{product.rating}</p>
                <div className="flex">
                  {[...Array(Math.floor(product.rating))].map((_, index) => (
                    <Star key={index} width={18} height={18} className="fill-yellow-400 stroke-none" />
                  ))}

                  {product.rating % 1 !== 0 && (
                    <StarHalf width={18} height={18} className="fill-yellow-400 stroke-none" />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top">More Info</td>
              <td className="pl-10">{product.detail}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-end">
          {product.discount ? (
            <div className="flex gap-2 items-baseline">
              <p className="font-light line-through text-muted-foreground">{formatCurrency(product.price)}</p>
              <p className="font-semibold text-xl text-end">{formatCurrency(discountPrice)}</p>
            </div>
          ):(
            <p className="font-semibold text-xl text-end">{formatCurrency(product.price)}</p>
          )}
        </div>
      </div>
      <SheetFooter className="border-t">
        <div className="flex justify-between gap-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <ShoppingCart /> Add to cart
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

const ProductSheetLoading = () => {
  return (
    <SheetContent className="w-[500px] sm:max-w-[500px] font-nunito text-base font-normal">
      <SheetHeader className="border-b">
        <SheetTitle>Product Details</SheetTitle>
      </SheetHeader>
      <div className="grid overflow-y-auto gap-5 px-4">
        <Skeleton className="w-full aspect-video"/>
        <Skeleton className="w-full h-8"/>
        <Skeleton className="w-full h-16"/>

        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-1/3 h-5"/>
            <Skeleton className="w-full h-5"/>
          </div>
        ))}

        <div className="flex items-center justify-end">
          <Skeleton className="w-20 h-6"/>
        </div>
      </div>
      <SheetFooter className="border-t">
        <Skeleton className="w-full h-10"/>
      </SheetFooter>
    </SheetContent>
  )
}

export {ProductSheetContent, ProductSheetLoading}