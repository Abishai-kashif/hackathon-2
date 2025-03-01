// components/WishlistButton.tsx
"use client";

import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { animated, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/nextjs";

export function WishlistButton({ productId, className, onRemove }: IProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const { isSignedIn } = useUser();
    const clerk = useClerk();

    const iconClasses = `size-9 text-red-500`;

    // Spring animation for heart icon
    const springProps = useSpring({
        transform: isAnimating ? "scale(1.2)" : "scale(1)",
        config: { tension: 300, friction: 10 },
    });

    // Load initial wishlist state
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.includes(productId));
    }, [productId]);

    const handleWishlistToggle = () => {
        if (!isSignedIn) {
            // Open sign-in modal if not authenticated
            clerk.openSignIn();
            return;
        }

        setIsAnimating(true);
        const newState = !isWishlisted;

        // Update localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const updatedWishlist = newState
            ? [...wishlist, productId]
            : wishlist.filter((id: string) => id !== productId);

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsWishlisted(newState);

        // Trigger onRemove callback
        if (!newState && onRemove) {
            onRemove();
        }

        // Reset animation
        setTimeout(() => setIsAnimating(false), 200);
    };

    return (
        <animated.div style={springProps} className={cn("ml-20", className)}>
            <button
                onClick={handleWishlistToggle}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
                title={
                    !isSignedIn
                        ? "Sign/in or register to add to wishlist"
                        : undefined
                }
                aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
            >
                {isWishlisted ? (
                    <div className="size-fit relative">
                        <AiFillHeart className={iconClasses} />

                        <GoDotFill className="absolute top-1 left-1 text-white text-[3px]" />
                    </div>
                ) : (
                    <AiOutlineHeart className={iconClasses} />
                )}
            </button>
        </animated.div>
    );
}

interface IProps {
    productId: string;
    className?: string;
    onRemove?: () => void;
}
