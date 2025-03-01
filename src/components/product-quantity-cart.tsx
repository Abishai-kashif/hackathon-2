// // components/QuantityControl.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useShoppingCart } from "use-shopping-cart";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-hot-toast";
// import AddToCart from "./add-to-cart";
// import { Product } from "@/types";
// import clsx from "clsx";

// export default function ProductQuantityCart({ product }: { product: Product }) {
//     const { addItem, setItemQuantity, cartDetails, handleCartClick } =
//         useShoppingCart();
//     const [quantity, setQuantity] = useState<any>(1);
//     const [availableStock, setAvailableStock] = useState(product.stockLevel);
//     const [isFocused, setIsFocused] = useState(false);
//     const [wishlist, setWishlist] = useState<Product[]>([]);

//     const btnClassName =
//         "size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black";

//     // Sync with cart quantity if item exists
//     useEffect(() => {
//         const cartItem = cartDetails?.[product._id];
//         if (cartItem) {
//             setQuantity(cartItem.quantity);
//         }
//     }, [cartDetails, product._id]);

//     // Fetch current stock periodically
//     useEffect(() => {
//         const interval = setInterval(async () => {
//             try {
//                 const response = await fetch(`/api/stock/${product._id}`);
//                 const { stockLevel } = await response.json();
//                 setAvailableStock(stockLevel);
//             } catch (error) {
//                 console.error("Stock check failed:", error);
//             }
//         }, 500); // Update every 500 ms

//         return () => clearInterval(interval);
//     }, [product._id]);

//     useEffect(() => {
//         const savedWishlist = localStorage.getItem("wishlist");
//         if (savedWishlist) {
//             setWishlist(JSON.parse(savedWishlist));
//         }
//     }, []);

//     useEffect(() => {
//         if (wishlist.length > 0) {
//             localStorage.setItem("wishlist", JSON.stringify(wishlist));
//         }
//     }, [wishlist]);

//     const addToWishlist = () => {
//         setWishlist((prevWishlist) => {
//             const updatedWishlist = [...prevWishlist, product];
//             console.log(updatedWishlist);

//             return updatedWishlist;
//         });
//         toast.success(`${product.name} has been added to your wishlist!`);
//     };

//     const handleQuantityChange = (newQuantity: any) => {
//         // Ensure value stays within valid range

//         if (newQuantity !== "") {
//             const numericQuantity = parseInt(newQuantity, 10);
//             console.log("numericQuantity: ", numericQuantity);
//             console.log("isNaN: ", isNaN(numericQuantity));

//             if (isNaN(numericQuantity)) {
//                 toast.error("Quantity must be a number");
//             } else if (numericQuantity < 1) {
//                 toast.error("Minimum quantity is 1");
//             } else if (newQuantity > availableStock) {
//                 toast.error(`Only ${availableStock} items available`);
//             }

//             setQuantity(numericQuantity);
//         }
//         setQuantity(newQuantity);
//     };

//     const handleAddToCart = () => {
//         if (availableStock <= 0) {
//             addToWishlist();
//             return;
//         }

//         if (quantity === "") {
//             toast.error("Please enter a quantity");
//             return;
//         }

//         const numericQuantity = parseInt(quantity, 10);

//         if (isNaN(numericQuantity)) {
//             toast.error("Quantity must be a number");
//             return;
//         } else if (numericQuantity < 1) {
//             toast.error("Minimum quantity is 1");
//             return;
//         } else if (numericQuantity > availableStock) {
//             toast.error("Not enough stock available");
//             return;
//         }

//         try {
//             // Determine the unique key using price_id if it exists, otherwise _id.
//             const uniqueKey = product.price_id ?? product._id;

//             // Check if an item with the uniqueKey is already in the cart.
//             if (cartDetails?.[uniqueKey]) {
//                 setItemQuantity(uniqueKey, numericQuantity || 1);
//                 toast.success(
//                     <p>
//                         Cart updated:{" "}
//                         <span className="font-semibold">{product.name}</span>{" "}
//                         now has{" "}
//                         <span className="font-semibold text-[#B88E2F]">
//                             {numericQuantity}
//                         </span>{" "}
//                         item(s).
//                     </p>
//                 );
//             } else {
//                 const { images, name, price_id, _id, price, sku } = product;

//                 // Use the uniqueKey as the price_id in the cart item.
//                 addItem(
//                     {
//                         price_id: price_id ?? _id,
//                         image: images[0],
//                         name,
//                         price,
//                         currency: "USD",
//                         sku,
//                         product_data: {
//                             color: "#000",
//                             size: "lg",
//                         },
//                     },
//                     {
//                         count: numericQuantity || 1,
//                     }
//                 );
//                 handleCartClick();
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(`Failed to update cart ${error.message}`);
//         }
//     };

//     console.log("Available stock:", availableStock);

//     return (
//         <div className="flex items-center flex-wrap gap-x-4 gap-y-11 mt-7">
//             <span>{availableStock} in stock</span>

//             <div
//                 className={clsx(
//                     "flex items-center justify-between gap-x-2 px-2 w-[123px] h-[64px] border rounded-[10px]",
//                     {
//                         "border-black border-[1.5px]": isFocused,
//                         "border-gray": !isFocused, // Only apply border-gray when not focused
//                     }
//                 )}
//             >
//                 <Button
//                     size="sm"
//                     className={btnClassName}
//                     onClick={() => {
//                         handleQuantityChange((parseInt(quantity, 10) || 0) - 1);
//                     }}
//                     disabled={quantity <= 1}
//                 >
//                     -
//                 </Button>

//                 <input
//                     type="text"
//                     className="text-black text-[16px] font-medium border-none w-10 text-center focus:border-none focus:outline-none"
//                     value={quantity}
//                     onChange={(e) => {
//                         const value = e.target.value;
//                         console.log("value: ", value);
//                         handleQuantityChange(value);
//                     }}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                 />
//                 <Button
//                     size="sm"
//                     className={btnClassName}
//                     onClick={() =>
//                         handleQuantityChange((parseInt(quantity, 10) || 0) + 1)
//                     }
//                     disabled={quantity >= availableStock}
//                 >
//                     +
//                 </Button>
//             </div>

//             <AddToCart
//                 callback={handleAddToCart}
//                 // disabled={availableStock === 0}
//             >
//                 {availableStock > 0
//                     ? cartDetails?.[product.price_id]
//                         ? "Update Cart"
//                         : "Add to Cart"
//                     : "Add to Wishlist"}
//             </AddToCart>
//         </div>
//     );
// }

// components/QuantityControl.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";
import AddToCart from "./add-to-cart";
import CartToasterMessage from "./cart-toaster-message";
import { WishlistButton } from "./wishlist-button";

export default function ProductQuantityCart({ product }: { product: Product }) {
    const { addItem, setItemQuantity, cartDetails, handleCartClick } =
        useShoppingCart();
    const [quantity, setQuantity] = useState<StateType>(1);
    const [availableStock, setAvailableStock] = useState(product.stockLevel);
    const [isFocused, setIsFocused] = useState(false);
    const availableStockRef = useRef(availableStock);
    const numQuantityRef = useRef(
        (typeof quantity === "string" ? parseInt(quantity, 10) : quantity) || 1
    );

    const uniqueKey = useMemo(
        () => product.price_id ?? product._id,
        [product.price_id, product._id]
    );

    const btnClassName =
        "size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black";

    // Sync quantity with cart
    useEffect(() => {
        const cartItem = cartDetails?.[uniqueKey];
        setQuantity(cartItem?.quantity || 1);
    }, [cartDetails, uniqueKey]);

    // Stock polling with cleanup and reference
    useEffect(() => {
        const fetchStockLevels = async () => {
            try {
                const response = await fetch(`/api/stock/${product._id}`);
                const { stockLevel } = await response.json();

                if (stockLevel !== availableStockRef.current) {
                    setAvailableStock(stockLevel);
                }
            } catch (error) {
                console.error("Stock check failed:", error);
            }
        };

        fetchStockLevels();

        const intervalId = setInterval(fetchStockLevels, 5000);

        return () => clearInterval(intervalId);
    }, [product._id]);

    // Update stock reference
    useEffect(() => {
        if (availableStockRef.current !== availableStock) {
            availableStockRef.current = availableStock;
        } else {
            numQuantityRef.current =
                (typeof quantity === "string"
                    ? parseInt(quantity, 10)
                    : quantity) || 1;
        }
    }, [availableStock, quantity]);

    const handleQuantityChange = useCallback((newValue: StateType) => {
        console.log("newValue type ➙ ", typeof newValue);
        console.log(numQuantityRef.current >= availableStock);
        console.log("quantity ref => ", numQuantityRef.current);
        if (newValue !== "") {
            const numericValue =
                typeof newValue === "string"
                    ? parseInt(newValue, 10)
                    : newValue;

            if (isNaN(numericValue)) {
                toast.error("Please enter a valid number");
                return;
            }

            if (numericValue < 1) {
                toast.error("Minimum quantity is 1");
                setQuantity(1);
                return;
            }

            if (numericValue > availableStockRef.current) {
                toast.error(
                    `Only ${availableStockRef.current} items available`
                );
                setQuantity(availableStockRef.current);
                return;
            }

            setQuantity(numericValue);
        }

        setQuantity(newValue);
    }, []);

    const handleAddToCart = useCallback(() => {
        if (quantity === "") {
            toast.error("Please enter a quantity");
            return;
        }

        if (quantity > availableStock) {
            toast.error("Not enough stock available");
            return;
        }

        try {
            const { images, name, price, sku } = product;

            const cartItem = {
                price_id: uniqueKey,
                image: images[0],
                name,
                price,
                currency: "USD",
                sku,
                product_data: {
                    color: "#000",
                    size: "lg",
                },
            };

            if (cartDetails?.[uniqueKey]) {
                setItemQuantity(uniqueKey, quantity);

                toast.success(
                    <CartToasterMessage name={name} quantity={quantity} />,
                    {
                        duration: 5000,
                        position: "top-right",
                        style: {
                            minWidth: "250px",
                            padding: "14px 10px 20px 10px",
                        },
                    }
                );
            } else {
                addItem(cartItem, { count: quantity });
                handleCartClick();
            }
        } catch (error) {
            console.error(error);
            toast.error(
                `Failed to update cart: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }, [
        quantity,
        availableStock,
        product,
        uniqueKey,
        cartDetails,
        addItem,
        setItemQuantity,
        handleCartClick,
    ]);

    return (
        <div className="flex items-center flex-wrap gap-x-4 gap-y-11 mt-7">
            <span
                className={clsx("text-sm", {
                    "text-green-600": availableStock >= 20,
                    "text-[#B88E2F]": availableStock < 20,
                    "text-red-600": availableStock < 10,
                })}
            >
                {availableStock} in stock
            </span>

            {!(availableStock <= 0) && (
                <div
                    className={clsx(
                        "flex items-center justify-between gap-x-2 px-2 w-[123px] h-[64px] border rounded-[10px]",
                        {
                            "border-black border-[1.5px]": isFocused,
                            "border-gray": !isFocused,
                        }
                    )}
                >
                    <Button
                        size="sm"
                        className={btnClassName}
                        onClick={() => {
                            handleQuantityChange(numQuantityRef.current - 1);
                        }}
                        disabled={numQuantityRef.current <= 1}
                    >
                        -
                    </Button>

                    <input
                        type="number"
                        min="1"
                        max={availableStock}
                        className="text-black text-[16px] font-medium border-none w-10 text-center focus:border-none focus:outline-none hide-number-controls"
                        value={quantity}
                        onChange={(e) =>
                            handleQuantityChange(e.target.value as StateType)
                        }
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    <Button
                        size="sm"
                        className={btnClassName}
                        onClick={() => {
                            handleQuantityChange(numQuantityRef.current + 1);
                        }}
                        disabled={false}
                    >
                        +
                    </Button>
                </div>
            )}

            {/* if not in stock than show add to wishlist button */}
            {availableStock <= 0 ? (
                <WishlistButton productId={product._id} />
            ) : (
                <AddToCart
                    callback={handleAddToCart}
                    disabled={availableStock <= 0}
                >
                    {cartDetails?.[uniqueKey] ? "Update Cart" : "Add to Cart"}
                </AddToCart>
            )}
        </div>
    );
}

type StateType = number | "";
