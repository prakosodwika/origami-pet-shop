import { Category } from "@/types/category"
import CategoryCard from "../card/Category"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoriesProps {
  categories: Category[]
}

const CategorySection = ({ categories }: CategoriesProps) => {
  return (
    <section className="grid grid-cols-8 gap-4">
      {categories.map((item, i) => (
        <CategoryCard key={i} category={item} />
      ))}
    </section>
  )
}

const CategoryLoading = () => {
  return (
    <section className="grid grid-cols-8 gap-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="w-full aspect-square" />
      ))}
    </section>
  )
}

export {CategorySection, CategoryLoading}