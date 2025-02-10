import { cn } from "@/lib/utils";
import NavIcons from "./nav-icons";
import NavLinks from "./nav-links";
import NavLinksMobile from "./nav-links-mobile";

function Navbar({ className }: { className?: string }) {
    return (
        <header
            className={cn(
                `wrapper sticky top-0 z-[30] min-h-[100px] lg:h-[100px] flex flex-col lg:flex-row items-end lg:items-center justify-center bg-yellow`,
                className
            )}
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
