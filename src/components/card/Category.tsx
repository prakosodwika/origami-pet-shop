import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"
import { Category } from "@/types/category"

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({category}: CategoryCardProps) => {
  return (
    <Card className="p-2">
      <CardContent className="flex flex-col items-center p-2">
        <p className="text-sm text-center">{category.name}</p>
        <div className="w-full aspect-auto">
          <AspectRatio ratio={3/2}>
            <Image src={category.image_path} alt={category.name} className="obeject-cover" fill />
          </AspectRatio>
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryCard