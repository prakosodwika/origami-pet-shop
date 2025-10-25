import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetTrigger } from "../ui/sheet"
import {ProductSheetContent} from "../sheet/Product"
import { Product } from "@/types/product"
import { formatCurrency } from "@/lib/common"

interface ProductCardProps {
  product: Product & { 
    index: number,
    special: number 
  }
}

const bgColors = [
  'bg-purple-50 dark:bg-zinc-900',
  'bg-blue-50 dark:bg-zinc-900',
  'bg-green-50 dark:bg-zinc-900',
  'bg-red-50 dark:bg-zinc-900',
]

const borderColors = [
  'border-purple-100 dark:border-zinc-700',
  'border-blue-100 dark:border-zinc-700',
  'border-green-100 dark:border-zinc-700',
  'border-red-100 dark:border-zinc-700',
]

const SpecialCard = ({ product }: ProductCardProps) => {
  return (
    <Sheet>
      <Card className={`h-full py-10
          ${bgColors[product.index % bgColors.length]} 
          ${borderColors[product.index % borderColors.length]}
        `}>
        <CardContent className="flex flex-col gap-5 h-full justify-between items-center">
          <div className="flex flex-col gap-2 items-center">
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white items-center rounded-sm text-xs">
                SAVE {product.discount}%
              </Badge>
            )}
            <SheetTrigger asChild className="cursor-pointer">
              <p className="font-poppins font-medium text-center">{product.name}</p>
            </SheetTrigger>
            <Button size="sm" variant="outline" className="gap-1" >
              <ShoppingCart /> Add to Cart
            </Button>
            <p className="font-medium">{formatCurrency(product.special)}</p>
          </div>
          <SheetTrigger asChild className="cursor-pointer">
            <div className="w-3/4 aspect-auto">
              <AspectRatio ratio={1 / 1}>
                <Image src={product.image_path} alt={product.name} className="object-cover" fill />
              </AspectRatio>
            </div>
          </SheetTrigger>
        </CardContent>
      </Card>
      <ProductSheetContent product={product}/>
    </Sheet>
  )
}

const SpecialJumboCard = ({ product }: ProductCardProps) => {
  return (
    <Sheet>
      <Card className={`h-full col-span-2 ps-5 cursor-pointer
          ${bgColors[product.index % bgColors.length]} 
          ${borderColors[product.index % borderColors.length]}
        `}>
        <CardContent className="grid grid-cols-2 justify-between items-center h-full">
          <div className="flex flex-col gap-3">
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white items-center rounded-sm text-xs">
                SAVE {product.discount}%
              </Badge>
            )}
            <SheetTrigger asChild>
              <h3 className="font-poppins text-2xl font-semibold">{product.name}</h3>
            </SheetTrigger>
            <p className="font-light">{product.description}</p>

            <div className="flex gap-3 items-center mt-3">
              <Button>
                <ShoppingCart /> Add to Cart
              </Button>
              <p className="text-lg font-medium">{formatCurrency(product.special)}</p>
            </div>
          </div>

          <SheetTrigger asChild>
            <div className="w-full aspect-auto">
              <AspectRatio ratio={1 / 1}>
                <Image src={product.image_path} alt={product.name} className="object-cover" fill />
              </AspectRatio>
            </div>
          </SheetTrigger>
        </CardContent>
      </Card>
      <ProductSheetContent product={product}/>
    </Sheet>
  )
}

export { SpecialCard, SpecialJumboCard }