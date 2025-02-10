import {
    SingleProduct,
    RelatedProducts,
    SingleProductHighlight,
} from "@/components/sections/";
import CustomSeperator from "@/components/custom-separator";
import { notFound } from "next/navigation";

import getData, { isError } from "@/utils";
import { PRODUCT_QUERY } from "@/queries";
import { Product } from "@/types";
import ErrorMessage from "@/components/error-message";
import { Suspense } from "react";
import { Metadata } from "next";
import { FilterProductsGridSkeleton } from "@/components/ui/skeleton";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const { slug } = params;

    // Fetch product data
    const product = await getData<Product>(PRODUCT_QUERY, { slug });

    if (!product || isError(product)) {
        return {
            title: "Product Not Found",
            description: "The product you're looking for doesn't exist.",
        };
    }

    const { name, images, detailedDescription, tags } = product;

    return {
        title: `${name} | FurniturePress`,
        description:
            detailedDescription || `Explore ${name} at FurniturePress.`,
        keywords: tags?.join(", ") || "",
        openGraph: {
            title: `${name} | FurniturePress`,
            description:
                detailedDescription || `Explore ${name} at FurniturePress.`,
            images: [
                {
                    url: images[0], // Use the first image as the OpenGraph image
                    alt: name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${name} | FurniturePress`,
            description:
                detailedDescription || `Explore ${name} at FurniturePress.`,
            images: [images[0]], // Use the first image for Twitter card
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const product = await getData<Product>(PRODUCT_QUERY, { slug });

    if (!product) {
        notFound();
    }

    if (isError(product)) {
        return <ErrorMessage message={product.message} />;
    }

    const {
        _id,
        name,
        images,
        category,
        reviews,
        detailedDescription,
        additionalInfo,
    } = product;

    return (
        <main>
            {/* product section */}
            <SingleProduct product={product} />
            <CustomSeperator className="my-7 w-full h-[1px] bg-light-gray" />

            {/* highlight section */}
            <SingleProductHighlight
                image={images[0]}
                name={name}
                detailedDescription={detailedDescription}
                additionalInfo={additionalInfo}
                reviews={reviews}
            />
            <CustomSeperator className="mt-7 mb-16 w-full h-[1px] bg-light-gray" />

            {/* related products section */}

            <Suspense fallback={<FilterProductsGridSkeleton onlyShow="4" />}>
                <RelatedProducts id={_id} category={category} />
            </Suspense>
        </main>
    );
}
