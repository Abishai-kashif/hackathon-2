"use client";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { WishlistWelcomeSkeleton } from "./ui/skeleton";
import { getUserGreeting } from "@/utils";

export function WishlistWelcome({ noOfItems = 0 }: { noOfItems?: number }) {
    const { isLoaded, user } = useUser();

    return (
        <>
            {!isLoaded ? (
                <WishlistWelcomeSkeleton />
            ) : (
                <div className="bg-black/85 mb-8 px-5 sm:px-20 h-44 flex items-center">
                    <div className="flex items-center gap-5">
                        {/* User Avatar */}
                        <div className="hidden sm:block">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox:
                                            "h-[70px] w-[70px] border-2 border-white",
                                    },
                                }}
                            />
                        </div>

                        {/* Welcome Message */}
                        <div>
                            <h1 className="text-[32px] font-medium text-white">
                                Welcome back, {getUserGreeting(user)}
                            </h1>
                            <p className="text-light-gray font-normal text-[16px]">
                                You have{" "}
                                <span className="font-semibold">
                                    {noOfItems} items
                                </span>{" "}
                                in your wishlist. Happy shopping
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
