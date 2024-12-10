"use client";

import { usePathname } from "next/navigation";
import NavIcons from "./nav-icons";
import NavLinks from "./nav-links";
import NavLinksMobile from "./nav-links-mobile";

function Navbar() {
    const pathname = usePathname();

    return (
        <header
            className={`wrapper min-h-[100px] lg:h-[100px] flex flex-col lg:flex-row items-end lg:items-center justify-center relative ${
                pathname === "/" ? "bg-yellow" : "bg-azure"
            }`}
        >
            <div className="hidden lg:block">
                <NavLinks />
            </div>

            <div className="lg:hidden mb-1.5 mt-3 mr-7 sm:mr-10 ">
                <NavLinksMobile />
            </div>
            <NavIcons />
        </header>
    );
}

export default Navbar;
