"use client"

import {OrderRouteButton, OrderRouteLoading} from "@/components/button/OrderRoute"
import {AddressCard, AddressCardLoading} from "@/components/card/Address"
import {SummaryCard, SummaryCardLoading} from "@/components/card/Summary"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import OrderRoute from "@/components/OrderRoute"
import OrderRouteHeader from "@/components/section/header/OrderRoute"
import { Button } from "@/components/ui/button"
import { getAddresses } from "@/lib/fetchers/addressFetcher"
import { Address } from "@/types/address"
import { MapPinned } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const titleString = "Shipping Info"
const descriptionString = "Tell us where to send your package."
const previousData = { name: 'Order Summary', link: '/checkout/order-summary', isCancel: false }
const nextData = { name: 'Payment Method',  link: '/checkout/payment-method' }
const dummyPriceShipping = 25.99;

const ShippingInfo = () => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
      const fetchCarts = async () => {
        try {
          const dataShippings = await getAddresses();
          setAddresses(dataShippings);

          localStorage.setItem("address", JSON.stringify(dataShippings[0]))
          localStorage.setItem("shippingCost", dummyPriceShipping.toString())
        } catch (error) {
          console.error("Error fetching carts:", error);
        } finally {
          setLoading(false);
        }
      }

      const subTotal = localStorage.getItem("subtotal")
      if (subTotal) setSubTotal(Number(subTotal))
  
      fetchCarts();
    }, []);

  return (
    <div className="font-nunito container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <OrderRoute route="shipping-info"/>
      <div className="w-3/4 flex flex-col gap-5 mx-auto">
        <OrderRouteHeader title={titleString} description={descriptionString}>
          {!loading && 
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" >
                    <MapPinned /> Add Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Input id="recipient" name="recipient"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="street">Steet</Label>
                      <Input id="street" name="street"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="province">Province</Label>
                      <Input id="province" name="province"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="postal_code">Postal Code</Label>
                      <Input id="postal_code" name="postal_code"/>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          }
        </OrderRouteHeader>
        <div className="grid grid-cols-3 gap-10 w-full">
          <div className="col-span-2 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              {loading
                ? [...Array(4)].map((_, i) => <AddressCardLoading key={i} index={i} isFinal={false}/>)
                : addresses.map((item, i) => <AddressCard key={i} address={{...item, index: i, isFinal: false}}/>)
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
                  shippingCost={dummyPriceShipping} 
                  address={addresses[0]} 
                />
            }
          </div>
        </div>
      </div>
      <Footer className="mt-auto"/>
    </div>
  )
}

export default ShippingInfo