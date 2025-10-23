import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { SpecialCard, SpecialJumboCard } from "../card/Special"
import { Skeleton } from "../ui/skeleton"
import { Product } from "@/types/product"

interface SpecialProps {
  products: (Product & { special: number })[]
}

const SpecialSection = ({ products }: SpecialProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h5 className="text-lg font-medium">Special Pats</h5>
        <Link href={'/products'} className="text-sm text-blue-400 hover:text-blue-700 flex items-center">
          See all
          <ChevronRight width={15} height={15}/>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 h-full">
        {products.map((item, i) => (
          i === 0 
          ? <SpecialJumboCard key={i} product={{...item, index: i}} />
          : <SpecialCard key={item.id} product={{...item, index: i}} />
        ))}
      </div>
    </section>
  )
}

const SpecialLoading = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between font-nunito">
        <Skeleton className="w-1/10 h-5"/>
        <Skeleton className="w-1/25 h-5"/>
      </div>
      <div className="grid grid-cols-5 gap-4 h-full">
        {[...Array(4)].map((_, i) => (
          i === 0 ? 
          <Skeleton key={i} className="w-full col-span-2" /> :
          <Skeleton key={i} className="w-full aspect-square" />
        ))}
      </div>
    </section>
  )
}

export {SpecialSection, SpecialLoading}