import Link from "next/link";
import ProductsGrid from "../products-grid";
import TitleBar from "../title-bar";
import getData, { isError } from "@/utils";
import { RELATED_PRODUCTS_QUERY } from "@/queries";
import { CustomError, ProductPreview } from "@/types";
import ErrorMessage from "../error-message";

async function RelatedProducts({
    id,
    category,
}: {
    id: string;
    category: string;
}) {
    const relatedProducts: ProductPreview[] | CustomError = await getData(
        RELATED_PRODUCTS_QUERY,
        { id, category }
    );

    console.log(relatedProducts);

    if (
        !relatedProducts ||
        (relatedProducts as ProductPreview[]).length === 0
    ) {
        return (
            <>
                <TitleBar title="Related Products" />
                <ErrorMessage
                    className="text-black"
                    message={`No related products found`}
                />
            </>
        );
    }

    if (isError(relatedProducts)) {
        return <ErrorMessage message={relatedProducts.message} />;
    }

    return (
        <section className="wrapper mx-auto h-auto bg-white flex flex-col justify-center gap-5 pb-40">
            <TitleBar title="Related Products" styleContainer="mb-[-40px]" />

            <ProductsGrid products={relatedProducts} />

            <Link
                href={"/shop#products"}
                className="mx-auto mt-11 underline underline-offset-[22px] decoration-2 text-[20px] font-medium"
            >
                View More
            </Link>
        </section>
    );
}

export default RelatedProducts;
