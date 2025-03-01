import { cn } from "@/lib/utils";
import Logo from "./logo";
import NavIcons from "./nav-icons";
import NavLinks from "./nav-links";
import NavLinksMobile from "./nav-links-mobile";

function Navbar({ className }: { className?: string }) {
    return (
        <header
            className={cn(
                `wrapper sticky top-0 z-[30] min-h-[100px] lg:h-[100px] flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-between bg-yellow  lg:px-20 overflow-x-hidden`,
                className
            )}
        >
            {/* Logo */}
            <Logo className="hidden lg:block" />

            {/* Links */}
            <div className="hidden lg:block">
                <NavLinks />
            </div>

            <div className="lg:hidden mb-1.5 flex items-center justify-between px-4 sm:px-7 w-full">
                <Logo />
                <NavLinksMobile />
            </div>

            {/* Nav Icons */}
            <NavIcons />
        </header>
    );
}

export default Navbar;
