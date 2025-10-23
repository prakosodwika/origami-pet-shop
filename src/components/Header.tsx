'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet"
import { WishlistSheetContent, WishListLoading } from "./sheet/Wishlist";
import { CartSheetContent, CartSheetLoading } from "./sheet/Cart";
import { usePathname } from "next/navigation";
import { Cart } from "@/types/cart";
import { Wishlist } from "@/types/wishlist";
import { getWishlists } from "@/lib/fetchers/wishlistFetcher";
import { getCarts } from "@/lib/fetchers/cartFetcher";

type SectionState<T> = {
  data: T;
  loading: boolean;
  error?: string;
};

const Header = () => {
  const pathname = usePathname();
  const isCheckoutPage = pathname.startsWith("/checkout");
  const [sections, setSections] = useState({
    carts: { data: [] as Cart[], loading: true } as SectionState<Cart[]>,
    wishlists: { data: [] as Wishlist[], loading: true } as SectionState<Wishlist[]>,
  })

  useEffect(() => {
      const fetchData = async <T,>(
        key: keyof typeof sections,
        fetcher: () => Promise<T>
      ) => {
        try {
          const data = await fetcher();
          setSections((prev) => ({
            ...prev,
            [key]: { ...prev[key], data, loading: false },
          }));
        } catch (err) {
          console.error(`Error loading ${String(key)}:`, err);
          setSections((prev) => ({
            ...prev,
            [key]: { ...prev[key], loading: false, error: "Failed to load" },
          }));
        }
      };
  
      fetchData("wishlists", getWishlists);
      fetchData("carts", getCarts);
    }, []);

  const { wishlists, carts } = sections;

  return (
    <header className="flex justify-between">
      <Link href={'/'} className="flex gap-2 items-center">
        <Image src="/logo/dark.svg" width={25} height={25} alt="logo" />
        <p className="font-poppins font-medium text-xl ">Petify</p>
      </Link>

      <nav className="flex gap-3">
        {/* <Input type="search" placeholder="Search ..." className="w-80"/> */}
        {!isCheckoutPage && (
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size={'icon'} className="relative" >
                  <Heart />
                  {wishlists.data.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {wishlists.data.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              {wishlists.loading ? <WishListLoading /> : <WishlistSheetContent wishlists={wishlists.data} />}
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size={'icon'} className="relative">
                  <ShoppingCart />
                  {carts.data.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {carts.data.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              {carts.loading ? <CartSheetLoading /> : <CartSheetContent carts={carts.data} />}
            </Sheet>
          </div>
        )}

        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>

      </nav>
    </header>
  )
}

export default Header;