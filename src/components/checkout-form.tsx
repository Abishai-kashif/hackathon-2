"use client";

import { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/utils";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { log } from "util";

const formSchema = z.object({
    name: z.string().min(1).max(62),
    email: z.string().email(),
    subject: z.string().optional(),
    message: z.string().min(3).max(500),
});

type FormType = z.infer<typeof formSchema>;

const CheckoutForm = ({ amount }: { amount: number }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
    });

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function handleClientSecret() {
            const res = await fetch(
                "http://localhost:3000/api/create-payment-intent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: convertToSubcurrency(amount),
                    }),
                }
            );

            const data = await res.json();
            console.log(data);

            setClientSecret(data.clientSecret);
        }

        handleClientSecret();
    }, [amount]);

    const onSubmit = async (values: FormType) => {
        setLoading(true);

        if (!stripe || !elements) {
            console.log("Stripe.js has not loaded yet.");

            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            setErrorMessage(error.message);
        } else {
            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`.
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-white w-[527px] p-5 space-y-9 text-[18px]"
            >
                {clientSecret && <PaymentElement />}

                {errorMessage && <div>{errorMessage}</div>}

                <button
                    disabled={!stripe || loading}
                    className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                    type="submit"
                >
                    {!loading ? `Pay $${amount}` : "Processing..."}
                </button>
            </form>
        </Form>
    );
};

export default CheckoutForm;
