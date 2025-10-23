import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductSheetContent } from "../sheet/Product";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Product } from "@/types/product";
import { formatCurrency, formatNumber } from "@/lib/common";
import { Skeleton } from "../ui/skeleton";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const priceDiscount = product.price - ((product.price * product.discount) / 100);

  return (
    <Sheet>
      <Card className="p-1">
        <CardContent className="flex flex-col gap-5 p-1 h-full">
          <SheetTrigger asChild>
            <AspectRatio ratio={16 / 10} className="bg-gray-50 rounded-md border-1 flex flex-col items-end p-2 cursor-pointer">
              {product.discount > 0 && (
                <Badge className="bg-red-600 items-center rounded-sm text-xs">SAVE {product.discount}%</Badge>
              )}
              <Image src={product.image_path} alt={product.name} className="object-contain" fill />
            </AspectRatio>
          </SheetTrigger>
          <div className="mx-3 mb-2 flex flex-col justify-between gap-5 h-full">
            <div className="flex flex-col gap-2">
              <SheetTrigger asChild>
                <h6 className="font-poppins text-sm cursor-pointer hover:text-blue-600">{product.name}</h6>
              </SheetTrigger>

              {product.discount ? (
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{formatCurrency(priceDiscount)}</p>
                  <p className="text-sm font-light line-through text-muted-foreground">{formatCurrency(product.price)}</p>
                </div>
              ) : (
                <p className="font-semibold">{formatCurrency(priceDiscount)}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-yellow-500 items-center rounded-full"> <Star fill="white" /> {product.rating}</Badge>
              <Button size={'sm'} variant="outline" aria-label="Submit" className="sm">
                <ShoppingCart /> Add
              </Button>
            </div>
          </div>
        </CardContent>
        <ProductSheetContent product={product} />
      </Card>
    </Sheet>
  )
}

const ProductCardLoading = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <Skeleton className="w-full aspect-video"/>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/3 h-8"/>
        <Skeleton className="w-1/2 h-5"/>
        <Skeleton className="w-1/2 h-5"/>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-1/4 h-6"/>
        <Skeleton className="w-1/4 h-6"/>
      </div>
    </div>
  )
}

export {ProductCard, ProductCardLoading}