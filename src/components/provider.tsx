"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: ReactNode }) {
    const protocol =
        typeof window !== "undefined" ? window.location.protocol : "http:";
    const hostname =
        typeof window !== "undefined" ? window.location.hostname : "localhost";

    const port = typeof window !== "undefined" ? window.location.port : "3000";

    const successUrl = `${protocol}//${hostname}:${port}/stripe/success`;
    const cancelUrl = `${protocol}//${hostname}:${port}/stripe/error`;

    return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
            successUrl={successUrl}
            cancelUrl={cancelUrl}
            currency="USD"
            billingAddressCollection={true}
            shouldPersist={true}
            language="en-US"
        >
            {children}
        </USCProvider>
    );
}

export default CartProvider;
