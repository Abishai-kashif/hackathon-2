import { ResolvedSearchParams } from "@/types";
import { getTotalPages } from "@/utils";
import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";

export default async function Pagination({
    searchParams,
}: ResolvedSearchParams) {
    const currentPage = Number(searchParams?.page || 1);
    const pageSize = parseInt(searchParams?.show || "16");

    // Fetch total pages on the server
    const totalPages = await getTotalPages(pageSize);

    // Generate pagination links
    const allPages = generatePagination(currentPage, totalPages);

    function createPageURL(pageNumber: number | string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `?${params.toString()}#products`;
    }

    return (
        <div className="inline-flex gap-5 sm:gap-[38px]">
            <PaginationControl
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex gap-5 sm:gap-[38px]">
                {allPages.map((page, index) => {
                    let position:
                        | "first"
                        | "last"
                        | "single"
                        | "middle"
                        | undefined;

                    if (index === 0) position = "first";
                    if (index === allPages.length - 1) position = "last";
                    if (allPages.length === 1) position = "single";
                    if (page === "...") position = "middle";

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}
            </div>

            <PaginationControl
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
}) {
    const className = clsx(
        "flex size-[60px] items-center justify-center text-[20px] font-normal bg-light-yellow rounded-[10px]",
        {
            "z-10 bg-yellow": isActive,
            "hover:bg-yellow": !isActive && position !== "middle",
            "hidden md:flex": !isActive,
        }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationControl({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
}) {
    const className = clsx(
        "flex h-[60px] w-[98px] items-center justify-center rounded-[10px] bg-light-yellow text-[20px] font-light",
        {
            "pointer-events-none hidden": isDisabled,
            "hover:bg-yellow": !isDisabled,
        }
    );

    const text = direction === "left" ? "Prev" : "Next";

    return isDisabled ? (
        <div className={className}>{text}</div>
    ) : (
        <Link className={className} href={href}>
            {text}
        </Link>
    );
}
