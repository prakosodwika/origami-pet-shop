"use client"

import {OrderCard, OrderCardLoading} from "@/components/card/Order"
import {SummaryCard, SummaryCardLoading} from "@/components/card/Summary"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import OrderRoute from "@/components/OrderRoute"
import OrderRouteHeader from "@/components/section/header/OrderRoute"
import {OrderRouteButton, OrderRouteLoading} from "@/components/button/OrderRoute"
import { CartSheetContent, CartSheetLoading } from "@/components/sheet/Cart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { getCarts } from "@/lib/fetchers/cartFetcher"
import { Cart } from "@/types/cart"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

const titleString = "Order Summary"
const descriptionString = "Here’s everything you’re about to order."
const previousData = { name: 'Cancel', link: '/', isCancel: true }
const nextData = { name: 'Shipping Info', link: '/checkout/shipping-info' }

const orderSummary = () => {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const dataCarts = await getCarts();
        setCarts(dataCarts);
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  }, []);


  let subTotal = 0;
  carts.forEach(cart=> {
    const priceDiscount = cart.products.price - ((cart.products.price * cart.products.discount) / 100);
    subTotal += priceDiscount * cart.quantity;
  })

  useEffect(() => {
    localStorage.setItem("subtotal", subTotal.toString())
  }, [subTotal])
  

  return (
    <div className="font-nunito container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <OrderRoute route="order-summary" />
      <div className="w-3/4 flex flex-col gap-5 mx-auto">
        <OrderRouteHeader title={titleString} description={descriptionString}>
          {!loading && <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" >
                  <ShoppingCart /> View Card
                </Button>
              </SheetTrigger>
              {loading ? <CartSheetLoading /> : <CartSheetContent carts={carts} />}
            </Sheet>
          }
        </OrderRouteHeader>
        <div className="grid grid-cols-3 gap-10 w-full">
          <div className="col-span-2 flex flex-col gap-5">
            {loading
              ? [...Array(4)].map((_, i) => <OrderCardLoading key={i} />)
              : carts.map((item, i) => <OrderCard key={i} cart={item}  />)
            }
            {loading 
              ? <OrderRouteLoading />
              : <OrderRouteButton previous={previousData} next={nextData} />
            }
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            {loading 
              ? <SummaryCardLoading route="order" />
              : <SummaryCard route="order" subTotal={subTotal} />
            }
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default orderSummary