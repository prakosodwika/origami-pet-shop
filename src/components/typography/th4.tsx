import * as React from "react"
import { cn } from "@/lib/utils"

interface TH4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "muted" | "gradient"
}

export const TH4 = React.forwardRef<HTMLHeadingElement, TH4Props>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const variantClass = {
      default: "text-xl font-semibold tracking-tight",
      muted: "text-xl font-medium text-muted-foreground tracking-tight",
      gradient:
        "text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent",
    }[variant]

    return (
      <h4
        ref={ref}
        className={cn("scroll-m-20", variantClass, className)}
        {...props}
      >
        {children}
      </h4>
    )
  }
)

TH4.displayName = "TH4"
