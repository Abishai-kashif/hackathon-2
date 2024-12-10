import Link from "next/link";
import TitleBar from "../title-bar";
import ProductsGrid from "../productsGrid";

const topPicksProducts = [
    {
        image: "/products/product-1.png",
        name: "Trenton modular sofa_3",
        price: "25,000.00",
    },
    {
        image: "/products/product-2.png",
        name: "Granite dining table with dining chair",
        price: "25,000.00",
    },
    {
        image: "/products/product-3.png",
        name: "Outdoor bar table and stool",
        price: "25,000.00",
    },
    {
        image: "/products/product-4.png",
        name: "Plain console with teak mirror",
        price: "25,000.00",
    },
];

function TopPicks() {
    return (
        <section className="wrapper h-auto lg:h-[777px] bg-white flex flex-col justify-center items-center gap-5 py-14">
            <TitleBar
                title="Top Picks For You"
                para="Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights."
            />

            <ProductsGrid products={topPicksProducts} />

            <Link
                href={"#"}
                className="mx-auto mt-11 underline underline-offset-[22px] decoration-2 text-[20px] font-medium"
            >
                View More
            </Link>
        </section>
    );
}

export default TopPicks;
