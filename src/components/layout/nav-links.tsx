import Link from "next/link";

const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];
function NavLinks({ className }: { className?: string }) {
    return (
        <nav>
            <ul
                className={`flex gap-[75px] items-center justify-center text-[16px]  ${className}`}
            >
                {links.map((link, idx) => (
                    <li
                        key={idx}
                        className="font-medium text-black hover:underline underline-offset-8"
                    >
                        <Link href={link.href}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavLinks;
