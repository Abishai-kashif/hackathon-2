import Link from "next/link";
import TitleBar from "../title-bar";
import ProductsGrid from "../products-grid";
import ErrorMessage from "../error-message";
import getData, { isError } from "@/utils";
import { TOP_PICKS_QUERY } from "@/queries";
import { ProductPreview } from "@/types";

async function TopPicks() {
    const topProducts = await getData<ProductPreview[]>(TOP_PICKS_QUERY);

    if (!topProducts) {
        return (
            <ErrorMessage
                message={"Something went wrong while fetching products"}
            />
        );
    }

    if (isError(topProducts)) {
        return <ErrorMessage message={topProducts.message} />;
    }

    return (
        <section className="wrapper h-auto lg:h-[777px] bg-white flex flex-col justify-center items-center gap-5 py-14">
            <TitleBar
                title="Top Picks For You"
                para="Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights."
            />

            <ProductsGrid products={topProducts} />

            <Link
                href={"/shop#products"}
                className="mx-auto mt-11 underline underline-offset-[22px] decoration-2 text-[20px] font-medium"
            >
                View More
            </Link>
        </section>
    );
}

export default TopPicks;
