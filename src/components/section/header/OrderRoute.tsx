import { ReactNode } from "react"

type OrderRouteHeaderProps = {
  title: string,
  description?: string,
  children?: ReactNode
}

const OrderRouteHeader = ({ 
  title, 
  description, 
  children 
}: OrderRouteHeaderProps) => {
  return (
    <div className="font-nunito flex justify-between items-end">
      <div className="flex flex-col">
        <p className="font-poppins font-semibold text-xl">{title}</p>
        {description && <p className="font-light">{description}</p>}
      </div>
      
      {children && (
        <div className="flex gap-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default OrderRouteHeader