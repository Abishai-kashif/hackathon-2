import FilterBar from "@/components/filter-bar";
import FilterProductsGrid from "@/components/filterable-products-grid";
import Pagination from "@/components/pagination";
import {
    FilterProductsGridSkeleton,
    PaginationSkeleton,
} from "@/components/ui/skeleton";
import { SearchParams } from "@/types";
import { Suspense } from "react";

async function Shop({ searchParams }: SearchParams) {
    const params = await searchParams;

    return (
        <main className="wrapper bg-white mt-[50px]">
            {/* filterbar */}
            <FilterBar />

            <Suspense
                fallback={<FilterProductsGridSkeleton onlyShow={params.show} />}
                key={`${params?.sort}-${params?.show}-${params?.page}`} // Unique key combining params
            >
                <FilterProductsGrid searchParams={params} />
            </Suspense>

            <div className="size-fit mx-auto mt-28 mb-[88px]">
                <Suspense fallback={<PaginationSkeleton />}>
                    <Pagination searchParams={params} />
                </Suspense>
            </div>
        </main>
    );
}

export default Shop;
