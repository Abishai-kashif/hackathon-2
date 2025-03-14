"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { formatPathName, formatPrice } from "@/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "use-shopping-cart/core";
import CustomSeperator from "./custom-separator";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ShoppingCardModel() {
    const {
        cartCount,
        shouldDisplayCart,
        handleCartClick,
        cartDetails,
        removeItem,
        totalPrice,
    } = useShoppingCart();
    const { replace } = useRouter();

    const handleCheckoutClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (totalPrice <= 0) {
            toast.error("In order to checkout, please add items to cart");
            return;
        }

        replace("/checkout");
    };

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
            <SheetContent className="sm:max-w-[417px] w-[90vw]">
                <SheetHeader>
                    <SheetTitle className="text-[24px] font-semibold">
                        Shopping Cart
                    </SheetTitle>
                </SheetHeader>

                <CustomSeperator className="w-[287px] h-[0.5px] bg-light-gray mt-[22px]" />

                <div className="h-full flex flex-col justify-between">
                    <div className="mt-9 flex-1 overflow-y-auto flex flex-col justify-between">
                        <ul className="-my-6 divide-y divide-gray-200 h-auto">
                            {cartCount == 0 ? (
                                <h2 className="py-6">
                                    You don&apos;t have any items
                                </h2>
                            ) : (
                                <>
                                    {Object.values(cartDetails ?? {}).map(
                                        (entry: CartEntry) => (
                                            <li
                                                key={entry.id}
                                                className="flex items-center py-6"
                                            >
                                                {/* img */}
                                                <div className="bg-yellow h-[105px] w-[108px] flex-shrink-0 overflow-hidden rounded-[10px] flex items-center justify-center">
                                                    <Image
                                                        src={entry.image}
                                                        alt={entry.name}
                                                        width={108}
                                                        height={105}
                                                        priority
                                                        className="size-full object-contain object-center"
                                                    />
                                                </div>

                                                {/* details */}
                                                <div className="ml-7 flex flex-1 flex-col gap-y-[8px]">
                                                    {/* <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900"> */}
                                                    <h3 className="text-[16px]">
                                                        {
                                                            formatPathName(
                                                                entry.name
                                                            ).capitalizedWords
                                                        }
                                                    </h3>
                                                    {/* <p className="ml-4">
                                                                $
                                                                {entry.price.toFixed(
                                                                    1
                                                                )}
                                                            </p>
                                                        </div> */}
                                                    <div className="flex items-center gap-x-[15px]">
                                                        <span className="text-[16px]">
                                                            {entry.quantity}
                                                        </span>
                                                        <span className="text-[12px]">
                                                            X
                                                        </span>
                                                        <span className="text-12px] text-[#B88E2F]">
                                                            Rs.{" "}
                                                            {formatPrice(
                                                                entry.price
                                                            )}
                                                        </span>
                                                    </div>
                                                    {/* <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                            {entry.description}
                                                        </p> */}
                                                </div>

                                                {/* remove btn */}
                                                <Button
                                                    className="bg-gray rounded-full size-[18px] text-white p-3 hover:bg-red-500 transition duration-150"
                                                    onClick={() =>
                                                        removeItem(entry.id)
                                                    }
                                                >
                                                    <X strokeWidth={4} />
                                                </Button>
                                            </li>
                                        )
                                    )}
                                </>
                            )}
                        </ul>

                        <div className="flex items-center gap-x-24 text-[16px] mt-14">
                            <span>Subtotal</span>
                            <span className="text-[#B88E2F] font-semibold">
                                Rs. {formatPrice(totalPrice || 0)}
                            </span>
                        </div>
                    </div>

                    <CustomSeperator className="w-screen h-[0.5px] bg-light-gray my-5" />
                    <div className="flex items-center gap-x-[28px] mb-16 mt-2">
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-[50px] w-[131px] h-[31px] text-[12px]"
                        >
                            <Link href={"/cart"}>View Cart</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-[50px] w-[131px] h-[31px] text-[12px]"
                            onClick={handleCheckoutClick}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default ShoppingCardModel;
