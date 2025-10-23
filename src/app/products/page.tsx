"use client"

import {ProductCard, ProductCardLoading} from "@/components/card/Product"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getProductCount, getProducts } from "@/lib/fetchers/productFetcher"
import { Product } from "@/types/product"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

const Paginate = ({currentPage, totalPages}: {currentPage: number, totalPages: number}) => {
  let showPrev = currentPage - 1 > 0;
  let showNext = currentPage + 1 <= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        {showPrev && 
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        }
        {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
            <PaginationLink href={`?page=${i + 1}`} isActive={i + 1 === currentPage}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showNext &&
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  )
}

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentSearch = searchParams.get("search") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {[
          { id: "1", name: "Mammals" },
          { id: "2", name: "Birds" },
          { id: "3", name: "Fish" },
          { id: "4", name: "Reptiles" },
        ].map((cat) => (
          <Button
            key={cat.id}
            variant={currentCategory === cat.id ? "default" : "outline"}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      <Input
        type="search"
        placeholder="Search ..."
        className="w-80"
        onChange={handleSearch}
        defaultValue={currentSearch}
      />
    </div>
  );
};

const Products = () => {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCarts = async () => {
      setLoading(true);
      try {
        const dataProduct = await getProducts(currentPage, itemsPerPage, category, search);
        const dataProductCount = await getProductCount(category, search);
        setProducts(dataProduct);

        if (dataProductCount) setTotalPages(Math.ceil(dataProductCount / itemsPerPage))
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  },[currentPage, category, search]);

  return (
    <div className="container mx-auto flex flex-col gap-10 py-4 min-h-screen">
      <Header />
      <main className="flex flex-col gap-6">
        <Filters />
        <div className="grid grid-cols-5 gap-4">
          {loading 
            ? [...Array(10)].map((_, i) => <ProductCardLoading key={i} />)
            : products.map((item, i) => <ProductCard key={i}  product={item}/> )
          }
        </div>

        <Paginate currentPage={currentPage} totalPages={totalPages} />
      </main>
      <Footer className="mt-auto"/>
    </div>
  )
}

const ProductsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  )
}

export default ProductsPage