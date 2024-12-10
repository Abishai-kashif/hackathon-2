import Image from "next/image";
import Link from "next/link";

const icons = [
    "/icons/account-alert-icon.png",
    "/icons/search-icon.png",
    "/icons/heart-icon.png",
    "/icons/cart-icon.png",
];

function NavIcons() {
    return (
        <ul className="lg:absolute top-1/2  lg:right-[90px] lg:transform lg:-translate-y-1/2 flex gap-[45px] items-center justify-evenly flex-wrap  lg:justify-center py-3 px-2  bg-light-yellow lg:bg-transparent w-full lg:w-fit">
            {icons.map((icon, idx) => (
                <li key={idx}>
                    <Link href={"#"}>
                        <Image
                            src={icon}
                            alt={`nav icon ${idx + 1}`}
                            height={28}
                            width={28}
                            className="size-[26px] object-contain object-center shrink-0"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NavIcons;
