// components/results-count.tsx
"use client";

import { fetchTotalProductsCount } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsCount() {
    const searchParams = useSearchParams();
    const [productCount, setProductCount] = useState<number | null>(null);

    const currentPage = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("show")) || 16;
    const offset = (currentPage - 1) * limit;

    const showingStart = offset + 1;
    const showingEnd = productCount
        ? Math.min(offset + limit, productCount)
        : 0;

    useEffect(() => {
        const fetchCount = async () => {
            const count = await fetchTotalProductsCount();
            setProductCount(count);
        };

        fetchCount();
    }, []);

    if (productCount === null) {
        return (
            <Skeleton className="hidden sm:block h-6 w-[237px] ml-[16px] border-l-2 border-gray" />
        );
    }

    return (
        <span className="hidden sm:flex items-center justify-end border-l-2 border-gray text-[16px] font-normal ml-[16px] w-[237px]">
            Showing {showingStart}&ndash;{showingEnd} of {productCount} results
        </span>
    );
}
