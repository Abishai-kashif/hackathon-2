import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className="hover:scale-[1.02] transition">
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    height={50}
                    priority
                    className={cn(
                        "size-[50px] object-contain object-center",
                        className
                    )}
                />
                <h2 className="text-[13px] font-medium text-[#B88E2F] relative bottom-4">
                    Furniture Press
                </h2>
            </div>
        </Link>
    );
}

export default Logo;
