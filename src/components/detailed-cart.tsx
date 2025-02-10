"use client";

import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import CartTable from "./sections/cart-table";
import CartSummary from "./sections/cart-summary";
import { CartEntry } from "use-shopping-cart/core";

function DetailedCart() {
    const { cartDetails, removeItem, redirectToCheckout } = useShoppingCart();

    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [products, setProducts] = useState<CartEntry[]>([]);

    useEffect(() => {
        if (cartDetails && Object.keys(cartDetails).length > 0) {
            setIsCartEmpty(false);
            setProducts(Object.values(cartDetails));
        } else {
            setIsCartEmpty(true);
        }
    }, [cartDetails]);

    return (
        <>
            <CartTable
                products={products}
                isCartEmpty={isCartEmpty}
                removeItem={removeItem}
            />
            <CartSummary
                cartDetails={cartDetails}
                isCartEmpty={isCartEmpty}
                redirectToCheckout={redirectToCheckout}
            />
        </>
    );
}

export default DetailedCart;
