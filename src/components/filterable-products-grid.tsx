import getData, { isError } from "@/utils";
import ProductsGrid from "./products-grid";
import { ProductPreview, ResolvedSearchParams } from "@/types";
import { FILTRABLE_PRODUCTS_QUERY } from "@/queries";
import ErrorMessage from "./error-message";

async function FilterProductsGrid({ searchParams }: ResolvedSearchParams) {
    const { sort, show, page } = searchParams;

    const currentPage = parseInt(page) || 1; // Current page number
    const limit = parseInt(show) || 16; // Number of items per page
    const offset = (currentPage - 1) * limit; // Calculate the offset

    const products = await getData<ProductPreview[]>(FILTRABLE_PRODUCTS_QUERY, {
        limit,
        offset,
        sort: sort || "default",
    });

    if (!products || (products as ProductPreview[]).length === 0) {
        return <ErrorMessage message={`No Product Found`} />;
    }

    if (isError(products)) {
        return <ErrorMessage message={products.message} />;
    }

    return <ProductsGrid products={products} />;
}

export default FilterProductsGrid;
