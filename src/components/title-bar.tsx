import { cn } from "@/lib/utils";

interface IProps {
    title: string;
    para?: string;
    styleContainer?: string;
    styleTitle?: string;
    stylePara?: string;
}

function TitleBar({
    title,
    para,
    styleContainer,
    styleTitle,
    stylePara,
}: IProps) {
    return (
        <div
            className={cn(
                "w-full text-center flex flex-col gap-[13px]",
                styleContainer
            )}
        >
            <h2 className={cn("text-[36px] font-medium", styleTitle)}>
                {title}
            </h2>

            {para && (
                <p
                    className={cn(
                        "text-[16px] font-medium text-gray",
                        stylePara
                    )}
                >
                    {para}
                </p>
            )}
        </div>
    );
}

export default TitleBar;
