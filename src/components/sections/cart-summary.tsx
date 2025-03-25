"use client";

import { Button } from "../ui/button";
import { getSubtotal, getTotal } from "@/utils";
import Link from "next/link";
import { CartEntry } from "use-shopping-cart/core";

function CartSummary({ cartDetails, isCartEmpty }: IProps) {
    // const handleCheckout = async () => {
    //     try {
    //         const response = await redirectToCheckout();
    //         if (response?.error) {
    //             console.error("Error: ", response.error);
    //         }
    //     } catch (error) {
    //         console.error("Error: ", error);
    //         toast.error(error.message);
    //     }
    // };

    return (
        <div className="w-full lg:w-[393px] h-fit bg-light-yellow p-6 pb-20 flex flex-col gap-4 items-center justify-center">
            <h2 className="text-[32px] font-semibold mb-8 text-black text-center">
                {isCartEmpty ? "Your Cart is Empty" : "Cart Totals"}
            </h2>

            {!isCartEmpty && (
                <div className="w-full px-5 xl:px-12 space-y-8">
                    <div className="flex sm:text-left text-center sm:flex-row flex-col justify-between">
                        <span className="font-medium">Subtotal</span>
                        <span className="text-gray text-[16px]">
                            Rs. {getSubtotal(Object.values(cartDetails))}
                        </span>
                    </div>
                    <div className="flex justify-between sm:text-left text-center sm:flex-row flex-col">
                        <span className="font-medium">Total</span>
                        <span className="text-[#B88E2F] text-[20px] font-semibold">
                            Rs. {getTotal(Object.values(cartDetails))}
                        </span>
                    </div>
                </div>
            )}

            {!isCartEmpty ? (
                <Button
                    variant={"outline"}
                    className="rounded-[15px] sm:w-[222px] w-full h-[58.95px] mx-auto mt-[38px]"
                >
                    <Link href={"/checkout"}>Check Out</Link>
                </Button>
            ) : (
                <Button
                    asChild
                    variant={"outline"}
                    className="rounded-[15px] sm:w-[222px] w-full h-[58.95px] mx-auto mt-[38px]"
                >
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            )}
        </div>
    );
}

interface IProps {
    cartDetails: Record<string, CartEntry>;
    isCartEmpty: boolean;
}

export default CartSummary;
