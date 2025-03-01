"use client";

import ProductsGrid from "@/components/products-grid";
import { Button } from "@/components/ui/button";
import { FilterProductsGridSkeleton } from "@/components/ui/skeleton";
import WishlistHeader from "@/components/wishlist-header";
import { WishlistWelcome } from "@/components/wishlist-welcome";
import { cn } from "@/lib/utils";
import { WISHLIST_QUERY } from "@/queries";
import { client } from "@/sanity/lib/client";
import { ProductPreview } from "@/types"; // Assuming you have a Product type
import Link from "next/link";

import { useEffect, useState } from "react";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [products, setProducts] = useState<ProductPreview[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const containerStyles = "wrapper bg-white mt-[50px]";

    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            const ids = JSON.parse(savedWishlist);
            setWishlist(ids);

            // Fetch products when wishlist IDs are available
            const fetchWishlistProducts = async () => {
                try {
                    const result = await client.fetch<ProductPreview[]>(
                        WISHLIST_QUERY,
                        {
                            wishlistIds: ids,
                        }
                    );
                    setProducts(result);
                } catch (err) {
                    setError("Failed to load wishlist");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchWishlistProducts();
        } else {
            setLoading(false);
        }
    }, []);

    const handleProductRemove = (productId: string) => {
        // Update local state
        setProducts(
            (prevProducts) =>
                prevProducts?.filter((product) => product._id !== productId) ||
                null
        );
        setWishlist((prev) => prev.filter((id) => id !== productId));
    };

    if (loading) {
        return (
            <div className={containerStyles}>
                <WishlistWelcome />
                <WishlistHeader setWishlist={setWishlist} />
                <FilterProductsGridSkeleton onlyShow="4" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={containerStyles}>
                <h1 className="text-2xl font-bold text-red-500">{error}</h1>

                <Button
                    asChild
                    variant="outline"
                    className="mt-6  h-[50px] w-[200px]"
                >
                    <Link href="/" className="text-black underline mt-4 block">
                        Go to Homepage
                    </Link>
                </Button>
            </div>
        );
    }

    if (wishlist.length === 0 || !products?.length) {
        return (
            <div
                className={cn(
                    containerStyles,
                    "text-center min-h-[500px] mb-16"
                )}
            >
                <WishlistWelcome />
                <h1 className="text-[36px] font-medium mt-28">
                    Your Wishlist is Empty
                </h1>
                <p className="text-gray text-[16px]">
                    Start adding products to your wishlist!
                </p>

                <Button
                    asChild
                    variant="outline"
                    className="mt-6  h-[50px] w-[200px]"
                >
                    <Link href="/shop">Go to Shop</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className={containerStyles}>
            <WishlistWelcome noOfItems={wishlist.length} />

            <WishlistHeader setWishlist={setWishlist} />

            <ProductsGrid
                products={products}
                className="mb-16"
                onProductRemove={handleProductRemove}
            />
        </main>
    );
}
