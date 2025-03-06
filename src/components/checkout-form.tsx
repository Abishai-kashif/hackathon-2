"use client";

import { convertToSubcurrency, formatPrice } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";

import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { z } from "zod";
import { Button } from "./ui/button";

const formSchema = z.object({
    firstName: z.string().min(1).max(62),
    lastName: z.string().min(1).max(62),
    companyName: z.string().optional(),
    address: z.string().min(1).max(200),
    city: z.string().min(1).max(50),
    phone: z.string().min(1).max(30),
    email: z.string().email(),
});

type FormType = z.infer<typeof formSchema>;

const CheckoutForm = () => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
    });

    const apiUrl =
        "https://furniture-press.vercel.app/api/create-payment-intent";

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const { totalPrice, cartDetails } = useShoppingCart();

    useEffect(() => {
        async function handleClientSecret() {
            try {
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: convertToSubcurrency(totalPrice || 0),
                    }),
                });

                const data = await res.json();

                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }

        handleClientSecret();
    }, [totalPrice]);

    const onSubmit = async (values: FormType) => {
        setLoading(true);

        try {
            await client.create({
                _type: "order",
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                address: values.address,
                city: values.city,
                phone: values.phone,
                paymentMethod,
                clientSecret: paymentMethod === "online" ? clientSecret : null,
                products: Object.values(cartDetails).map((product) => ({
                    _key: product.id,
                    id: product.id,
                    quantity: product.quantity,
                })),
            });
        } catch (error) {
            console.error("Error creating order:", error);
        }

        if (paymentMethod === "online") {
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
                    return_url:
                        "https://furniture-press.vercel.app/stripe/success",
                },
            });

            if (error) {
                // This point is only reached if there's an immediate error when
                // confirming the payment. Show the error to your customer (for example, payment details incomplete)
                setErrorMessage(error.message);
                setLoading(false);
                return;
            }
        }

        setLoading(false);
    };

    if (!cartDetails || Object.keys(cartDetails).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-[36px] font-medium mb-7">
                    Your cart is empty
                </h2>

                <Button variant="outline" asChild>
                    <Link href="/shop">Continue shopping</Link>
                </Button>
            </div>
        );
    }

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
                className="bg-white w-full p-5 space-y-9 text-[18px] flex justify-center gap-x-32 mt-20  px-24 pt-10 pb-28"
            >
                {/* left */}
                <div className="space-y-10">
                    <h2 className="text-[36px] font-semibold mb-10">
                        Billing details
                    </h2>

                    <div className="flex items-center gap-8  sm:w-[453px] w-full">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            disabled={loading}
                                            className={`mt-5 block h-[75px] sm:w-[211px] w-full pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            disabled={loading}
                                            className={`mt-5 block h-[75px] sm:w-[211px] w-full pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                    Company Name (Optional)
                                </FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        disabled={loading}
                                        className={`mt-5 block sm:w-[453px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                    />
                                </FormControl>

                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                    Street address
                                </FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        disabled={loading}
                                        className={`mt-5 block sm:w-[453px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                    />
                                </FormControl>

                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                    Town / City
                                </FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        disabled={loading}
                                        className={`mt-5 block sm:w-[453px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                    />
                                </FormControl>

                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                    Phone
                                </FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        disabled={loading}
                                        className={`mt-5 block sm:w-[453px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                    />
                                </FormControl>

                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                    Email address
                                </FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        disabled={loading}
                                        className={`mt-5 block sm:w-[453px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                    />
                                </FormControl>

                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                {/* right */}
                <div>
                    {/* product summary */}
                    <div className="pt-14 border-b border-light-gray pb-8">
                        <div className="w-full item-center justify-between flex gap-4">
                            <h3 className="text-[24px] font-medium">Product</h3>{" "}
                            <span>Subtotal</span>
                        </div>

                        <ul className="space-y-4 my-4">
                            {Object.values(cartDetails).map((product) => (
                                <li
                                    className="flex justify-between items-center gap-4"
                                    key={product.id}
                                >
                                    <span className="text-[16px]">
                                        {product.name} x {product.quantity}
                                    </span>{" "}
                                    <span className="text-[16px] font-light">
                                        Rs.{" "}
                                        {formatPrice(
                                            product.value * product.quantity
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="w-full item-center justify-between flex gap-4">
                            <span className="text-[16px]">Total</span>{" "}
                            <span className="text-[24px] font-bold text-[#B88E2F]">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                    </div>

                    <p className="text-[16px] my-10 max-w-[529px]">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        <span className="font-semibold">privacy policy.</span>
                    </p>

                    <RadioGroup
                        value={paymentMethod}
                        onValueChange={(newValue) => {
                            setPaymentMethod(newValue);
                        }}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="r1" />
                            <Label
                                htmlFor="r1"
                                className="text-[16px] font-medium"
                            >
                                Online Payment
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="r2" />
                            <Label
                                htmlFor="r2"
                                className="text-[16px] font-medium"
                            >
                                Cash on Delivery
                            </Label>
                        </div>
                    </RadioGroup>

                    {paymentMethod === "online" && clientSecret ? (
                        <PaymentElement className="sm:w-[453px] w-full space-y-12 mt-14 mx-auto" />
                    ) : null}

                    {errorMessage && <div>{errorMessage}</div>}

                    <Button
                        variant="outline"
                        disabled={!stripe || loading}
                        className="text-black w-[318px] h-[64px] flex items-center justify-center mt-12 rounded-[15px] disabled:opacity-50 disabled:animate-pulse mx-auto text-[20px] font-normal"
                        type="submit"
                    >
                        {!loading ? "Place Order" : "Processing..."}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CheckoutForm;
