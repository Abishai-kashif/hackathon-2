import { cn } from "@/lib/utils";
import clsx from "clsx";
import { FaStar } from "react-icons/fa";
import TitleBar from "../title-bar";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-light-gray", className)}
            {...props}
        />
    );
}

function FilterProductsGridSkeleton({ onlyShow }: { onlyShow?: string }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-6 place-content-center mt-14">
            {Array.from({ length: parseInt(onlyShow) || 16 }).map(
                (_, index) => (
                    <div
                        key={index}
                        className="mx-auto h-[397px] w-[287px] flex flex-col gap-[14px]"
                    >
                        {/* image */}
                        <Skeleton className="h-[287px] w-full" />

                        {/* content */}
                        <div className="flex flex-col gap-[11px]">
                            <Skeleton className="h-4 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

function PaginationSkeleton() {
    return (
        <div className="inline-flex gap-5 sm:gap-[38px]">
            {/* Previous Button Skeleton */}
            <Skeleton className="h-[60px] w-[98px] rounded-[10px]" />

            {/* Page Numbers Skeleton */}
            <div className="flex gap-5 sm:gap-[38px]">
                {[...Array(5)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className={clsx(
                            `size-[60px] rounded-[10px] hidden md:block`,
                            {
                                block: index === 0,
                            }
                        )}
                    />
                ))}
            </div>

            {/* Next Button Skeleton */}
            <Skeleton className="h-[60px] w-[98px] rounded-[10px]" />
        </div>
    );
}

function ProductPageSkeleton() {
    return (
        <section className="wrapper mx-auto px-7 sm:px-24 py-10">
            <div className="bg-white">
                {/* Breadcrumb Skeleton */}
                <div className="w-full h-[100px]">
                    <Skeleton className="w-1/3 h-4 rounded" />
                </div>

                <div className="mx-auto mt-7">
                    {/* product */}
                    <div className="flex gap-14 flex-col md:flex-row flex-wrap overflow-hidden">
                        {/* Product Images Skeleton */}
                        <div className="grid gap-6 xl:grid-cols-5">
                            {/* small images skeleton */}
                            <div className="order-last xl:order-none flex xl:flex-col gap-4">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <Skeleton
                                        key={idx}
                                        className="rounded-[10px] h-[80px] w-[76px]"
                                    />
                                ))}
                            </div>

                            {/* Main image skeleton */}
                            <Skeleton className="lg:col-span-4 rounded-[10px] w-full h-[300px] sm:h-[500px] sm:w-[425px]" />
                        </div>

                        {/* Product Content Skeleton */}
                        <div className="md:pt-5 h-fit flex-1 space-y-6">
                            {/* Product Title Skeleton */}
                            <Skeleton className="w-3/4 h-14 rounded mb-3" />
                            {/* Product Price Skeleton */}
                            <Skeleton className="w-1/4 h-6 rounded" />

                            {/* Rating & Review Skeleton */}
                            <div className="flex items-center gap-6 my-4">
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <FaStar
                                            key={idx}
                                            className="size-[20px] animate-pulse"
                                            fill={"#d9d9d9"}
                                        />
                                    ))}
                                </div>
                                <Skeleton className="w-[1.5px] h-7" />
                                <Skeleton className="w-20 h-4 rounded" />
                            </div>

                            {/* Product Description Skeleton */}
                            <Skeleton className="w-full h-16 rounded" />

                            {/* Size Buttons Skeleton */}
                            <div className="space-y-[12px] mb-4">
                                <h4 className="text-[14px] text-gray capitalize">
                                    Size
                                </h4>
                                <ul className="flex items-center justify-center w-fit gap-x-[16px]">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            className="size-[30px] rounded-[5px]"
                                        />
                                    ))}
                                </ul>
                            </div>

                            {/* Color Buttons Skeleton */}
                            <div className="space-y-[12px] mb-4">
                                <h4 className="text-[14px] text-gray capitalize">
                                    Color
                                </h4>

                                <ul className="flex items-center justify-center w-fit gap-x-[16px]">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            className="rounded-full size-[30px]"
                                        />
                                    ))}
                                </ul>
                            </div>

                            {/* Product Quantity / Cart Button Skeleton */}
                            <Skeleton className="w-full h-10 rounded" />

                            {/* Product Meta Info Skeleton */}
                            <div className="space-y-2 mt-7">
                                <Skeleton className="w-1/2 h-4 rounded" />
                                <Skeleton className="w-1/3 h-4 rounded" />
                                <Skeleton className="w-2/3 h-4 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SideTableSkeleton() {
    return (
        <section className="wrapper h-auto lg:h-[672px] bg-azure flex flex-col lg:flex-row gap-x-5 justify-center  p-5 px-24">
            <div className="w-full sm:w-[605px] sm:h-[562px] relative  grid">
                {/* Product Image Skeleton */}
                <Skeleton className="w-[500px] aspect-square self-end justify-self-end rounded" />

                {/* Product Title Skeleton */}

                <div className="flex flex-col">
                    <Skeleton className="w-24 h-5 rounded" />

                    {/* View More Skeleton */}
                    <Skeleton className="mt-4 w-16 h-4 rounded" />
                </div>
            </div>
            <div className="w-full sm:w-[605px] sm:h-[562px] relative  grid">
                {/* Product Image Skeleton */}
                <Skeleton className="w-[500px] aspect-square self-end justify-self-end rounded" />

                {/* Product Title Skeleton */}

                <div className="flex flex-col">
                    <Skeleton className="w-24 h-5 rounded" />

                    {/* View More Skeleton */}
                    <Skeleton className="mt-4 w-16 h-4 rounded" />
                </div>
            </div>
        </section>
    );
}

function TopPicksSkeleton() {
    return (
        <section className="wrapper h-auto lg:h-[777px] bg-white flex flex-col justify-center items-center gap-5 py-14">
            <TitleBar
                title="Top Picks For You"
                para="Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights."
            />

            <FilterProductsGridSkeleton onlyShow="4" />

            <Skeleton className="mx-auto mt-11 w-16 h-4 rounded" />
        </section>
    );
}

function NewArrivalSkeleton() {
    return (
        <section className="wrapper lg:h-[639px] pt-20 lg:pt-0 bg-light-yellow overflow-hidden flex flex-col-reverse lg:flex-row">
            {/* Product Image Skeleton */}
            <Skeleton className="w-[300px] h-[200px] lg:w-[963px] lg:h-[799px] rounded-lg" />

            {/* Text and Button Section */}
            <div className="flex flex-col gap-[33px] justify-center items-center ml-12">
                <div className="flex flex-col gap-[11px] items-center justify-center">
                    {/* New Arrivals Label Skeleton */}
                    <Skeleton className="w-24 h-4 rounded" />

                    {/* Product Name Skeleton */}
                    <Skeleton className="w-36 h-6 rounded" />
                </div>

                {/* Order Now Button Skeleton */}
                <Skeleton className="h-[64px] w-[255px] rounded border mx-auto" />
            </div>
        </section>
    );
}

export {
    Skeleton,
    FilterProductsGridSkeleton,
    PaginationSkeleton,
    ProductPageSkeleton,
    SideTableSkeleton,
    TopPicksSkeleton,
    NewArrivalSkeleton,
};
