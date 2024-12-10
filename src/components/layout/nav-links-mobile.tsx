import { Menu } from "lucide-react";
import NavLinks from "./nav-links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function NavLinksMobile() {
    return (
        <Sheet>
            <SheetTrigger className="outline-none">
                <Menu className="size-[35px] text-black/75 transition-all hover:text-black" />
            </SheetTrigger>

            <SheetContent>
                <NavLinks className="flex-col items-center gap-7 text-[20px] pt-24 text-center " />
            </SheetContent>
        </Sheet>
    );
}

export default NavLinksMobile;
