import { cn } from "@/lib/utils";

function ErrorMessage({
    message,
    className,
}: {
    message: string;
    className?: string;
}) {
    return (
        <p className={cn("text-center text-lg text-red-500 my-5", className)}>
            {message}, please reload
        </p>
    );
}

export default ErrorMessage;
