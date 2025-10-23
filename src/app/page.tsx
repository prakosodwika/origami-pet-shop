"use client"

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CategoryLoading, CategorySection } from "@/components/section/Category";
import { LimitedTimeDealLoading, LimitedTimeDealSection } from "@/components/section/LimitedTimeDeal";
import { NewArivalLoading, NewArrivalSection } from "@/components/section/NewArrival";
import { PopularLoading, PopularSection } from "@/components/section/Popular";
import { SpecialLoading, SpecialSection } from "@/components/section/Special";
import { getCategories } from "@/lib/fetchers/categoryFetcher";
import { getLimitedProducts, getNewProducts, getPopularProducts, getSpecialProducts } from "@/lib/fetchers/productFetcher";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

type SectionState<T> = {
  data: T;
  loading: boolean;
  error?: string;
};

export default function Home() {
  const [sections, setSections] = useState({
    categories: { data: [] as Category[], loading: true } as SectionState<Category[]>,
    populars: { data: [] as Product[], loading: true } as SectionState<Product[]>,
    newArrivals: { data: [] as Product[], loading: true } as SectionState<Product[]>,
    limiteds: { data: [] as Product[], loading: true } as SectionState<Product[]>,
    specials: { data: [] as (Product & { special: number })[], loading: true } as SectionState<(Product & { special: number })[]>,
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

    fetchData("populars", getPopularProducts);
    fetchData("limiteds", getLimitedProducts);
    fetchData("specials", getSpecialProducts);
    fetchData("newArrivals", getNewProducts);
    fetchData("categories", getCategories);
  }, []);

  const { categories, specials, newArrivals, populars, limiteds } = sections;

  return (
      <div className="container mx-auto flex flex-col gap-10 py-4 font-nunito">
        <Header />
        <main className="flex flex-col gap-8">
          {categories.loading ? <CategoryLoading /> : <CategorySection categories={categories.data}/>}
          {specials.loading ? <SpecialLoading /> : <SpecialSection products={specials.data}/>}
          {newArrivals.loading ? <NewArivalLoading /> : <NewArrivalSection products={newArrivals.data} />}
          {populars.loading ? <PopularLoading /> : <PopularSection products={populars.data}/>}
          {limiteds.loading ? <LimitedTimeDealLoading /> : <LimitedTimeDealSection products={limiteds.data}/>}
        </main>
        <Footer /> 
      </div>
  );
}
