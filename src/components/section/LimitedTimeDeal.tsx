import { ChevronRight } from "lucide-react"
import Link from "next/link"
import {ProductCard} from "../card/Product"
import { Skeleton } from "../ui/skeleton"
import { Product } from "@/types/product"

interface LimitedTimeDealProps {
  products: Product[]
}

const LimitedTimeDealSection = ({products}: LimitedTimeDealProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h5 className="text-lg font-semibold">Limited-Time Deal Pats</h5>
        <Link href={'/products'} className="text-sm text-blue-400 hover:text-blue-700  flex items-center">
          See all
          <ChevronRight width={18} height={18}/>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 h-full">
        {products.map((item, i) => (
          <ProductCard key={i} product={item} />
        ))}
      </div>
    </section>
  )
}

const LimitedTimeDealLoading = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between font-nunito">
        <Skeleton className="w-1/7 h-5"/>
        <Skeleton className="w-1/25 h-5"/>
      </div>
      <div className="grid grid-cols-5 gap-4 h-full">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-square" />
        ))}
      </div>
    </section>
  )
}

export {LimitedTimeDealSection, LimitedTimeDealLoading}