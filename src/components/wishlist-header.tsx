import React from "react";
import { Button } from "./ui/button";

function WishlistHeader({
    setWishlist,
}: {
    setWishlist?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const isDisabled = !setWishlist;

    return (
        <div className="pt-10 px-5 sm:px-24 flex flex-col sm:flex-row gap-y-5 sm:items-center sm:justify-between">
            <h1 className="text-[36px] font-medium">Your Wishlist</h1>

            <Button
                onClick={() => {
                    if (isDisabled) return;

                    localStorage.removeItem("wishlist");
                    setWishlist([]);
                }}
                className="text-[20px] rounded-none h-[50px] w-[200px] disabled:opacity-60"
                variant="destructive"
                disabled={isDisabled}
            >
                Clear Wishlist
            </Button>
        </div>
    );
}

export default WishlistHeader;
