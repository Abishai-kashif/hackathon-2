import {
    Blogs,
    Hero,
    NewArrivals,
    SideTable,
    TopPicks,
    Banner,
} from "@/components/sections";
export default function Home() {
    return (
        <main>
            <Hero />
            <SideTable />
            <TopPicks />
            <NewArrivals />
            <Blogs />
            <Banner />
        </main>
    );
}
