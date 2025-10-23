"use client"

import {AddressCard, AddressCardLoading} from "@/components/card/Address"
import {OrderCard, OrderCardLoading} from "@/components/card/Order"
import { PaymentMethodCard, PaymentMethodCardLoading} from "@/components/card/PaymentMethod"
import {ReceiptCard, ReceiptCardLoading} from "@/components/card/receipt"
import { SummaryCard, SummaryCardLoading } from "@/components/card/Summary"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import OrderRoute from "@/components/OrderRoute"
import OrderRouteHeader from "@/components/section/header/OrderRoute"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/common"
import { getCarts } from "@/lib/fetchers/cartFetcher"
import { getFirstTransaction } from "@/lib/fetchers/transactionFetcher"
import { Address } from "@/types/address"
import { Cart } from "@/types/cart"
import { PaymentMethod } from "@/types/paymentMethod"
import { Transaction } from "@/types/transactions"
import { ListCheck, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const titleString = "Order Placed"
const descriptionString = "Your order is confirmed! Here’s what happens next."

const orderPlaced = () => {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([])
  const [transaction, setTransaction] = useState<Transaction>()
  const [address, setAddress] = useState<Address>()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>()
  const [subTotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [vat, setVat] = useState(0)

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const dataCarts = await getCarts();
        const dataTransaction = await getFirstTransaction()
        
        setTransaction(dataTransaction)
        setCarts(dataCarts);
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    }

    const subTotal = localStorage.getItem("subtotal")
    const shippingCost = localStorage.getItem("shippingCost")
    const vat = localStorage.getItem("vat")
    const address = localStorage.getItem("address")
    const paymentMethod = localStorage.getItem("paymentMethod")

    if (address) setAddress(JSON.parse(address))
    if (paymentMethod) setPaymentMethod(JSON.parse(paymentMethod))
    if (shippingCost) setShippingCost(Number(shippingCost))
    if (subTotal) setSubtotal(Number(subTotal))
    if (vat) setVat(Number(vat))

    fetchCarts();
  }, []);

  return (
    <div className="font-nunito container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <OrderRoute route="order-placed" />
      <div className="w-3/4 flex flex-col gap-5 mx-auto">
        <OrderRouteHeader title={titleString} description={descriptionString}>
          {!loading && 
            <Button asChild variant="outline" >
              <Link href="/my-order">
                <ListCheck /> My Order
              </Link>
            </Button>
          }
          {!loading && 
            <Button asChild variant="outline" className="bg-blue-500 text-white">
              <Link href="/">
                <ShoppingBag /> Continue Shopping
              </Link>
            </Button>
          }
        </OrderRouteHeader>
        <div className="grid grid-cols-3 gap-10 w-full">
          <div className="col-span-2 flex flex-col gap-5">
            {loading
              ? (
                <ReceiptCardLoading>
                  {[...Array(2)].map((_, i) => <OrderCardLoading key={i} />)}
                </ReceiptCardLoading>
              ) : (
                <ReceiptCard
                  id={transaction!.id}
                  order_id={transaction!.order_id}
                  order_placed={formatDate(transaction!.order_placed)}
                  total={formatCurrency(transaction!.total)}
                  ship_to={transaction!.addresses.name}
                  estimated_delivery={formatDate(transaction!.estimated_delivery)}
                  show_receipt={false}
                >
                  {carts.map((item, i) => <OrderCard key={i} cart={item} />)}
                </ReceiptCard>
              )
            }
            <div className="grid grid-cols-2 gap-5">
              {loading
                ? <PaymentMethodCardLoading isFinal={true}/>
                : <PaymentMethodCard paymentMethod={{ ...paymentMethod!, isFinal: true }} />
              }
              {loading
                ? <AddressCardLoading isFinal={true}/>
                :<AddressCard address={{ ...address!, isFinal: true }} />
              }
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            {loading
              ? <SummaryCardLoading route="order" />
              : <SummaryCard route="order"
                subTotal={subTotal}
                shippingCost={shippingCost}
                vat={vat}
              />
            }
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default orderPlaced