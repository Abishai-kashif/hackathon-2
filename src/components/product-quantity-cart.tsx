// "use client";

// import { Button } from "./ui/button";
// import { useShoppingCart } from "use-shopping-cart";

// function QuanityControls({ entryId }: { entryId: string }) {
//     const { setItemQuantity } = useShoppingCart();

//     return (
//         <div className="flex items-center justify-between gap-x-2 px-2 w-[123px] h-[64px] border border-gray rounded-[10px]">
//             <Button
//                 type="button"
//                 onClick={() => setItemQuantity(Math.max(quantity - 1, 1))}
//                 className="size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black"
//                 disabled={quantity <= 1 ? true : false}
//             >
//                 -
//             </Button>
//             <p className="text-black text-[16px] font-medium">{quantity}</p>
//             <Button
//                 type="button"
//                 onClick={() => setItemQuantity(quantity + 1)}
//                 variant={"secondary"}
//                 className="size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black"
//             >
//                 +
//             </Button>
//         </div>
//     );
// }

// export default QuanityControls;

// components/QuantityControl.tsx
// "use client";

// import { useShoppingCart } from "use-shopping-cart";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export function QuantityControl({
//     productId,
//     initialStock,
//     price,
//     name,
//     currency,
// }: {
//     productId: string;
//     initialStock: number;
//     price: number;
//     name: string;
//     currency: string;
// }) {
//     const {
//         addItem,
//         decrementItem,
//         cartDetails,
//         setItemQuantity,
//         handleCartClick,
//     } = useShoppingCart();
//     const [currentStock, setCurrentStock] = useState(initialStock);
//     const [loading, setLoading] = useState(false);

//     const cartItem = cartDetails?.[productId];
//     const currentQuantity = cartItem?.quantity || 0;

//     const btnClassName =
//         "size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black";

//     const updateStock = async () => {
//         try {

//             const res = await fetch(`/api/stock/${productId}`);
//             const { stockLevel } = await res.json();
//             setCurrentStock(stockLevel);
//         } catch (error) {
//             console.error("Failed to update stock information");
//         }
//     };

//     const handleIncrement = async () => {
//         setLoading(true);
//         try {
//             await updateStock();

//             if (currentQuantity >= currentStock) {
//                 console.error("Maximum available quantity reached");
//                 return;
//             }

//             if (currentQuantity === 0) {
//                 addItem({
//                     name,
//                     id: productId,
//                     price,
//                     currency,
//                 }),
//                     handleCartClick();
//             } else {
//                 setItemQuantity(productId, currentQuantity + 1);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDecrement = () => {
//         if (currentQuantity > 0) {
//             decrementItem(productId);
//         }
//     };

//     return (
//         <div className="flex items-center justify-between gap-x-2 px-2 w-[123px] h-[64px] border border-gray rounded-[10px]">
//             <Button
//                 size="sm"
//                 className={btnClassName}
//                 onClick={handleDecrement}
//                 disabled={currentQuantity === 0 || loading}
//             >
//                 -
//             </Button>
//             <span className="text-black text-[16px] font-medium">
//                 {currentQuantity}
//             </span>
//             <Button
//                 size="sm"
//                 className={btnClassName}
//                 onClick={handleIncrement}
//                 disabled={currentQuantity >= currentStock || loading}
//             >
//                 +
//             </Button>
//         </div>
//     );
// }

// components/QuantityControl.tsx
"use client";

import { useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import AddToCart from "./add-to-cart";
import { Product } from "@/types";

export default function ProductQuantityCart({ product }: { product: Product }) {
    const { addItem, setItemQuantity, cartDetails, handleCartClick } =
        useShoppingCart();
    const [quantity, setQuantity] = useState(1);
    const [availableStock, setAvailableStock] = useState(product.stockLevel);

    const btnClassName =
        "size-5 bg-transparent p-2 pt-[10px] text-[16px] rounded-full hover:bg-light-gray/60 flex items-center justify-center text-black";

    // Sync with cart quantity if item exists
    useEffect(() => {
        const cartItem = cartDetails?.[product._id];
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartDetails, product._id]);

    // Fetch current stock periodically
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`/api/stock/${product._id}`);
                const { stockLevel } = await response.json();
                setAvailableStock(stockLevel);
            } catch (error) {
                console.error("Stock check failed:", error);
            }
        }, 300); // Update every 300 ms

        return () => clearInterval(interval);
    }, [product._id]);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > availableStock) {
            toast.error(`Only ${availableStock} items available`);
            return;
        }
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (quantity > availableStock) {
            toast.error("Not enough stock available");
            return;
        }

        try {
            // Determine the unique key using price_id if it exists, otherwise _id.
            const uniqueKey = product.price_id ?? product._id;

            // Check if an item with the uniqueKey is already in the cart.
            if (cartDetails?.[uniqueKey]) {
                setItemQuantity(uniqueKey, quantity);
                // toast.success("Cart quantity updated");
                handleCartClick();
            } else {
                const { images, name, price_id, _id, price, sku } = product;

                // Use the uniqueKey as the id in the cart item.
                addItem(
                    {
                        price_id: price_id ?? _id,
                        image: images[0],
                        name,
                        price,
                        currency: "USD",
                        sku,
                        product_data: {
                            color: "#000",
                            size: "lg",
                        },
                    },
                    {
                        count: quantity,
                    }
                );
                handleCartClick();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update cart");
        }
    };

    console.log("Available stock:", availableStock);

    return (
        <div className="flex items-center flex-wrap gap-x-4 gap-y-11 mt-7">
            <span>{availableStock} in stock</span>

            <div className="flex items-center justify-between gap-x-2 px-2 w-[123px] h-[64px] border border-gray rounded-[10px]">
                <Button
                    size="sm"
                    className={btnClassName}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                >
                    -
                </Button>
                <span className="text-black text-[16px] font-medium border-none">
                    {quantity}
                </span>
                <Button
                    size="sm"
                    className={btnClassName}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= availableStock}
                >
                    +
                </Button>
            </div>

            <AddToCart
                callback={handleAddToCart}
                disabled={availableStock === 0}
            >
                {cartDetails?.[product.price_id]
                    ? "Update Cart"
                    : "Add to Cart"}
            </AddToCart>
        </div>
    );
}
