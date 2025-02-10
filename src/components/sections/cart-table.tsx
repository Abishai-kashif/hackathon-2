"use client";

import { formatPrice } from "@/utils";
import { Frown, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartEntry } from "use-shopping-cart/core";

function CartTable({ products, isCartEmpty, removeItem }: IProps) {
    return (
        <div className="w-full lg:flex-1 h-[400px] overflow-y-auto">
            <table className="w-full space-y-48">
                <thead className="w-full">
                    <tr className="bg-light-yellow">
                        <th className="p-4 text-[16px] font-medium">Product</th>
                        {/*  */}
                        <th className="p-4 text-[16px] font-medium text-left">
                            Price
                        </th>
                        <th className="p-4 text-[16px] font-medium md:text-right">
                            Quantity
                        </th>
                        <th className="p-4 text-[16px] font-medium md:text-left hidden sm:table-cell">
                            Subtotal
                        </th>
                        <th className="p-4 text-[16px] font-medium"></th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {!isCartEmpty ? (
                        products.map((prod) => {
                            const { id, name, image, price, quantity } = prod;
                            return (
                                <tr className="text-[16px]" key={id}>
                                    {/* Product Image and Name */}
                                    <td className="p-4 pl-0 flex items-center gap-8">
                                        <div className="size-[106px] bg-yellow rounded-md hidden md:flex items-center justify-center">
                                            <Image
                                                src={image}
                                                alt="Asgaard sofa"
                                                width={106}
                                                height={106}
                                                className="w-full h-full object-contain object-center"
                                            />
                                        </div>
                                        <span className="text-gray">
                                            {name}
                                        </span>
                                    </td>
                                    {/* Price */}
                                    <td className="p-4 text-gray">
                                        Rs. {formatPrice(price)}
                                    </td>
                                    {/* Quantity */}
                                    <td className="p-4 md:text-center">
                                        <input
                                            type="text"
                                            defaultValue={quantity}
                                            readOnly
                                            className="size-[32px] border border-gray text-center rounded-md"
                                        />
                                    </td>
                                    {/* Subtotal */}
                                    <td className="p-4 text-gray-500 hidden sm:table-cell">
                                        Rs. {formatPrice(price * quantity)}
                                    </td>
                                    {/* Remove Icon */}
                                    <td className="p-4 relative">
                                        <Button
                                            onClick={() => removeItem(id)}
                                            className="mx-auto hover:bg-transparent"
                                            variant={"ghost"}
                                            size={"icon"}
                                            asChild
                                        >
                                            <Trash className="fill-yellow text-yellow hover:fill-red-600 hover:text-red-600 cursor-pointer h-[25px] w-[30px] transition-all duration-200" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5}>
                                <h2 className="text-xl py-5 font-[550] text-center bg-gray-50 text-gray-700 flex items-center justify-center gap-x-3">
                                    No item found{" "}
                                    <Frown className="h-7 w-7 animate-bounce" />
                                </h2>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

interface IProps {
    products: CartEntry[];
    isCartEmpty: boolean;
    removeItem: (id: string) => void;
}

export default CartTable;
