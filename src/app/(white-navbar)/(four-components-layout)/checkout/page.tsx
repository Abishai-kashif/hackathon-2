"use client";

import CheckoutForm from "@/components/checkout-form";
import { convertToSubcurrency } from "@/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Home() {
    const amount = 1000;

    return (
        <main className="wrapper min-h-screen flex flex-col items-center justify-center">
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "usd",
                    appearance: {
                        rules: {
                            ".Input": {
                                fontSize: "18px",
                                fontWeight: "500",
                                color: "black",
                                cursor: "pointer",
                                display: "block",
                                innerWidth: "527px",
                                outerWidth: "527px",

                                innerHeight: "75px",
                                outerHeight: "75px",
                                paddingLeft: "1.5rem",
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
                <CheckoutForm amount={amount} />
            </Elements>
        </main>
    );
}
