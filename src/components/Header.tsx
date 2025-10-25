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

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SectionState<T> = {
  data: T;
  loading: boolean;
  error?: string;
};

const Header = () => {
  const pathname = usePathname();
  const isCheckoutPage = pathname.startsWith("/checkout");
  const { setTheme, theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
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
      setMounted(true);
    }, []);

  const { wishlists, carts } = sections;

  if (!mounted) {
    return (
      <div style={{ width: 25, height: 25 }} />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "dark" 
    ? "/logo/light.svg" 
    : "/logo/dark.svg";

  return (
    <header className="flex justify-between">
      <Link href={'/'} className="flex gap-2 items-center">
        <Image src={logoSrc} width={25} height={25} alt="logo" />
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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