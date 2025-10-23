import { Skeleton } from "@/components/ui/skeleton"

type OrderInfoProps = {
  label: string,
  value: string
}

const OrderInfo = ({label, value}: OrderInfoProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-light">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

const OrderInfoLoading = () => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <Skeleton className="w-1/2 h-5" />
      <Skeleton className="w-2/3 h-5" />
    </div>
  )
}

export { OrderInfo, OrderInfoLoading }