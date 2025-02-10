"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function AddToCart({ children, className, disabled, callback }: IProps) {
    return (
        <Button
            variant={"outline"}
            className={cn(
                "rounded-[15px] w-[215px] h-[64px] ml-auto sm:ml-0",
                className
            )}
            disabled={disabled}
            onClick={callback}
        >
            {children}
        </Button>
    );
}

interface IProps {
    children: React.ReactNode;
    callback?: () => void;
    className?: string;
    disabled?: boolean;
}

export default AddToCart;
