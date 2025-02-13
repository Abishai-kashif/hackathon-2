"use client";

import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "../ui/button";

const icons = [
    { icon: "/icons/account-alert-icon.png", href: "/my-account" },
    { icon: "/icons/search-icon.png", href: "/" },

    // all the items in sanity gonna have "isWished" prop; if true?
    // set them to wishlist
    { icon: "/icons/heart-icon.png", href: "/" },
    { icon: "/icons/cart-icon.png", href: "/" },
];

function NavIcons() {
    const { handleCartClick, cartCount } = useShoppingCart();

    return (
        <ul className="lg:absolute top-1/2  lg:right-[90px] lg:transform lg:-translate-y-1/2 flex gap-[45px] items-center justify-evenly flex-wrap  lg:justify-center py-3 px-2  bg-light-yellow lg:bg-transparent w-full lg:w-fit">
            {icons.map((iconObj, idx) =>
                icons.length - 1 === idx ? (
                    <li key={idx}>
                        <Button
                            asChild
                            onClick={() => handleCartClick()}
                            className="bg-transparent border-none p-0 m-0 hover:bg-transparent hover:cursor-pointer"
                        >
                            <div className="relative flex items-center justify-center">
                                <Image
                                    src={iconObj.icon}
                                    alt={`nav icon ${idx + 1}`}
                                    height={28}
                                    width={28}
                                    className="size-[26px] object-contain object-center shrink-0"
                                />

                                {/* render cart count at top of the button */}
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-2.5 text-[12px] text-white bg-red-600 rounded-full size-[20px] flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </li>
                ) : idx === 1 ? (
                    <li key={idx}>
                        <Image
                            src={iconObj.icon}
                            alt={`nav icon ${idx + 1}`}
                            height={28}
                            width={28}
                            className="peer size-[26px] object-contain object-center shrink-0 cursor-pointer"
                        />
                        <input
                            className="absolute top-0 left-0 text-[18px] text-gray rounded-md hidden peer-[click]:block  w-full h-full"
                            type="text"
                            placeholder="Search"
                        />
                    </li>
                ) : (
                    <li key={idx}>
                        <Link href={iconObj.href}>
                            <Image
                                src={iconObj.icon}
                                alt={`nav icon ${idx + 1}`}
                                height={28}
                                width={28}
                                className="size-[26px] object-contain object-center shrink-0"
                            />
                        </Link>
                    </li>
                )
            )}
        </ul>
    );
}

export default NavIcons;
