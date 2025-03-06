"use client";

import CheckoutForm from "@/components/checkout-form";
import { convertToSubcurrency } from "@/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useShoppingCart } from "use-shopping-cart";

if (process.env.NEXT_PUBLIC_STRIPE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Home() {
    const { totalPrice } = useShoppingCart();

    return (
        <main className="wrapper min-h-screen flex flex-col items-center justify-center">
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(totalPrice),
                    currency: "usd",
                    appearance: {
                        rules: {
                            ".Input": {
                                // Adjust font, color, etc. as desired
                                fontSize: "18px",
                                fontWeight: "500",
                                color: "black",
                                // Give the input some padding and top margin
                                padding: "1rem",
                                marginTop: "1rem",
                                // Set a fixed height if desired
                                height: "75px",
                                // Add a border, radius, etc.
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                            },
                        },
                        variables: {
                            borderRadius: "10px",
                            blockLogoColor: "black",
                            colorPrimary: "black",
                            focusOutline: "none",
                        },
                    },
                }}
            >
                <CheckoutForm />
            </Elements>
        </main>
    );
}
