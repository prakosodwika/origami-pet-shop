"use client"

import { OrderRouteButton, OrderRouteLoading } from "@/components/button/OrderRoute"
import { PaymentMethodCard, PaymentMethodCardLoading } from "@/components/card/PaymentMethod"
import { SummaryCard, SummaryCardLoading } from "@/components/card/Summary"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import OrderRoute from "@/components/OrderRoute"
import OrderRouteHeader from "@/components/section/header/OrderRoute"
import { getPaymentMethods } from "@/lib/fetchers/paymentMethodFetcher"
import { Address } from "@/types/address"
import { PaymentMethod } from "@/types/paymentMethod"
import { useEffect, useState } from "react"

const titleString = "Payment Method"
const descriptionString = "Choose how you’d like to pay."
const previousData = { name: 'Shipping Info', link: '/checkout/shipping-info', isCancel: false }
const nextData = { name: 'Order Placed', link: '/checkout/order-placed' }
const dummyVat = 5.99;

const PaymentMethodPage = () => {
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [subTotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [address, setAddress] = useState<Address>()

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const dataPaymentMethod = await getPaymentMethods();
        setPaymentMethods(dataPaymentMethod);

        localStorage.setItem("paymentMethod", JSON.stringify(dataPaymentMethod[0]))
        localStorage.setItem("vat", dummyVat.toString())
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    }

    const subTotal = localStorage.getItem("subtotal")
    const shippingCost = localStorage.getItem("shippingCost")
    const address = localStorage.getItem("address")

    if (address) setAddress(JSON.parse(address))
    if (shippingCost) setShippingCost(Number(shippingCost))
    if (subTotal) setSubtotal(Number(subTotal))

    fetchCarts();
  }, []);

  return (
    <div className="font-nunito container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <OrderRoute route="payment-method" />
      <div className="w-3/4 flex flex-col gap-5 mx-auto">
        <OrderRouteHeader title={titleString} description={descriptionString} />
        <div className="grid grid-cols-3 gap-10 w-full">
          <div className="col-span-2 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 items-start">
              {loading
                ? [...Array(4)].map((_, i) => <PaymentMethodCardLoading key={i} index={i} isFinal={false} />)
                : paymentMethods.map((item, i) => <PaymentMethodCard key={i} paymentMethod={{...item, index: i, isFinal: false}} />)
              }
            </div>
            {loading 
              ? <OrderRouteLoading />
              : <OrderRouteButton previous={previousData} next={nextData} />
            }
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            {loading 
              ? <SummaryCardLoading route="shipping" /> 
              : <SummaryCard route="shipping" 
                  subTotal={subTotal} 
                  shippingCost={shippingCost} 
                  address={address} 
                  vat={dummyVat}
                />
            }
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default PaymentMethodPage