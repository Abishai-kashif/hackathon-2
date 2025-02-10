import { ProductPreview } from "@/types";
import Product from "./product";
import { cn } from "@/lib/utils";
import React from "react";

function ProductsGrid({
    products,
    className,
}: {
    products: ProductPreview[];
    className?: string;
}) {
    return (
        <ul
            id="products"
            className={cn(
                `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-6 place-content-center mt-14`,
                className
            )}
        >
            {products.map((product) => {
                const { _id, image, name, price, slug } = product;

                return (
                    <li key={_id}>
                        <Product
                            image={image}
                            name={name}
                            price={price}
                            slug={slug.current}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default React.memo(ProductsGrid);
