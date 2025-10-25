import Link from "next/link"
import { Button } from "../ui/button"
import { MoveLeft, MoveRight } from "lucide-react"
import { Skeleton } from "../ui/skeleton"

type RouteButtonProps = {
  previous: { name: string, link: string, isCancel: boolean }
  next: { name: string, link: string }
}

const OrderRouteButton = ({ previous, next }: RouteButtonProps) => {
  return (
    <div className="flex justify-end gap-5 items-center text-xs">
      <Button asChild variant={"outline"}>
        <Link href={previous.link}>
          <MoveLeft /> {previous.name}
        </Link>
      </Button>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href={next.link}>
          {next.name} <MoveRight />
        </Link>
      </Button>
    </div>
  )
}

const OrderRouteLoading = () => {
  return (
    <div className="flex justify-end gap-5 items-center">
      <Skeleton className="w-24 h-8" />
      <Skeleton className="w-24 h-8" />
    </div>
  )
}

export {OrderRouteButton, OrderRouteLoading}