import { cn } from "@/lib/utils";

function CustomSeperator({ className }: { className?: string }) {
    return (
        <div className={cn("h-9 w-[1.5px] bg-gray rounded-full", className)} />
    );
}

export default CustomSeperator;
