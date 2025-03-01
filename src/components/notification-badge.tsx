import { cn } from "@/lib/utils";

function NotificationBadge({ count, className }: IProps) {
    return (
        <span
            className={cn(
                "absolute -top-0.5 -right-2.5 text-[12px] text-white bg-red-600 rounded-full size-[20px] flex items-center justify-center",
                className
            )}
        >
            {count}
        </span>
    );
}

interface IProps {
    count: number;
    className?: string;
}

export default NotificationBadge;
