import { cn } from "@/lib/utils"
import { ScrollText, ShoppingBag, Truck, Wallet } from "lucide-react"

type OrderRouteProps = {
  route: string
}

const OrderRoute = ({ route }: OrderRouteProps) => {
  const steps = [
    { id: "order-summary", label: "Order Summary", icon: ShoppingBag },
    { id: "shipping-info", label: "Shipping Info", icon: Truck },
    { id: "payment-method", label: "Payment Method", icon: Wallet },
    { id: "order-placed", label: "Order Placed", icon: ScrollText },
  ]

  const activeIndex = steps.findIndex((step) => step.id === route)

  return (
    <section className="flex items-center justify-center mb-5">
      {steps.map((step, idx) => {
        const Icon = step.icon
        // semua step sebelum & termasuk activeIndex akan aktif
        const isActive = idx <= activeIndex

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "text-sm flex items-center border py-2 px-3 rounded-full gap-2 transition-all duration-300",
                isActive
                  ? "bg-blue-100 text-blue-500 border-blue-200"
                  : "border-zinc-300 text-zinc-500"
              )}
            >
              <Icon size={16} /> {step.label}
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0 border-t border-dashed transition-all duration-300",
                  idx < activeIndex
                    ? "border-blue-400"
                    : "border-zinc-300 dark:border-zinc-600"
                )}
              ></div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default OrderRoute