import {
    Blogs,
    Hero,
    NewArrivals,
    SideTable,
    TopPicks,
    OurInsta,
} from "@/components/sections";
import {
    NewArrivalSkeleton,
    SideTableSkeleton,
    TopPicksSkeleton,
} from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
    return (
        <main>
            <Hero />

            <Suspense fallback={<SideTableSkeleton />}>
                <SideTable />
            </Suspense>

            <Suspense fallback={<TopPicksSkeleton />}>
                <TopPicks />
            </Suspense>

            <Suspense fallback={<NewArrivalSkeleton />}>
                <NewArrivals />
            </Suspense>

            <Blogs />
            <OurInsta />
        </main>
    );
}
