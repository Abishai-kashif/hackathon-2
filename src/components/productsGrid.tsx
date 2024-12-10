import Product, { IProduct } from "./product";

function ProductsGrid({
    products,
    className,
}: {
    products: IProduct[];
    className?: string;
}) {
    return (
        <ul
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-6 place-content-center mt-14 ${className}`}
        >
            {products.map((product, idx) => (
                <li key={idx}>
                    <Product
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ProductsGrid;
