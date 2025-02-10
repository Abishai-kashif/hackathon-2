import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    className?: string;
}

function ExtraInfo({ children, className }: IProps) {
    return (
        <div
            className={cn(
                "text-gray text-[16px] font-normal space-y-4 pt-10 border-t border-gray",
                className
            )}
        >
            {children}
        </div>
    );
}

function ExtraInfoList({ children, className }: IProps) {
    return (
        <ul className={cn("space-y-4 h-full w-full", className)}>{children}</ul>
    );
}

function ExtraInfoItem({ children, className }: IProps) {
    return <li className={cn("flex items-center", className)}>{children}</li>;
}

function ExtraInfoTag({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    return <span className={cn("w-[90px]", className)}>{name}</span>;
}

function ExtraInfoValue({
    value,
    className,
}: {
    value: string | ReactNode[];
    className?: string;
}) {
    return <span className={className}>{value}</span>;
}

function ExtraInfoSeparator({
    children,
    className,
}: {
    children?: string;
    className?: string;
}) {
    return (
        <span className={cn("mr-3 font-semibold", className)}>
            {children ?? ":"}
        </span>
    );
}

export {
    ExtraInfo,
    ExtraInfoList,
    ExtraInfoItem,
    ExtraInfoTag,
    ExtraInfoValue,
    ExtraInfoSeparator,
};
