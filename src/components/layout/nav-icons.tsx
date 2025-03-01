"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useClerk,
    useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import NotificationBadge from "../notification-badge";
import SearchBar from "../search-bar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function NavIcons() {
    const { handleCartClick, cartCount } = useShoppingCart();
    const { isLoaded, isSignedIn } = useUser();
    const clerk = useClerk();
    const { replace } = useRouter();

    const handleWishlistClick = () => {
        if (!isSignedIn) {
            clerk.openSignIn();
            return;
        }

        replace("/wishlist");
    };

    return (
        // lg:absolute top-1/2 lg:right-[90px] lg:transform lg:-translate-y-1/2
        <ul className="flex gap-[45px] items-center justify-evenly flex-wrap lg:justify-center py-3 px-2 bg-light-yellow lg:bg-transparent w-full lg:w-fit">
            <li>
                {!isLoaded ? (
                    <Skeleton className="size-[26px] rounded-full" />
                ) : (
                    <>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Image
                                    title="My account"
                                    src="/icons/account-alert-icon.png"
                                    alt="nav icon 1"
                                    height={28}
                                    width={28}
                                    className="size-[26px] object-contain object-center shrink-0 cursor-pointer"
                                />
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonBox: "relative mt-1.5",
                                        userButtonAvatar: "size-[26px]",
                                    },
                                }}
                            />
                        </SignedIn>
                    </>
                )}
            </li>

            <li>
                <div>
                    <Popover>
                        <PopoverTrigger asChild title="Search">
                            <Image
                                src="/icons/search-icon.png"
                                alt="nav icon 2"
                                height={28}
                                width={28}
                                className="size-[26px] object-contain object-center shrink-0 cursor-pointer"
                            />
                        </PopoverTrigger>

                        <PopoverContent className="mt-5 mx-auto sm:mx-10 md:mx-20 w-screen max-w-[420px] p-0 rounded-lg shadow-xl border">
                            <SearchBar />
                        </PopoverContent>
                    </Popover>
                </div>
            </li>
            <li>
                <button
                    onClick={handleWishlistClick}
                    title={
                        !isSignedIn
                            ? "Sign/in or register to view wishlist"
                            : "View wishlist"
                    }
                    className="mt-1.5"
                >
                    <Image
                        src="/icons/heart-icon.png"
                        alt="nav icon 3"
                        height={28}
                        width={28}
                        className="size-[26px] object-contain object-center shrink-0"
                    />
                </button>
            </li>
            <li>
                <Button
                    asChild
                    onClick={() => handleCartClick()}
                    className="bg-transparent border-none p-0 m-0 hover:bg-transparent hover:cursor-pointer"
                    title="View cart"
                >
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/icons/cart-icon.png"
                            alt="nav icon 4"
                            height={28}
                            width={28}
                            className="size-[26px] object-contain object-center shrink-0"
                        />
                        {cartCount > 0 && (
                            <NotificationBadge count={cartCount} />
                        )}
                    </div>
                </Button>
            </li>
        </ul>
    );
}

export default NavIcons;
