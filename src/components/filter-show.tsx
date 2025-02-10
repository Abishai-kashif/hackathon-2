"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState, useEffect } from "react";

function FilterShow() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [showValue, setShowValue] = useState(
        searchParams.get("show") || "16"
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [popOverOpen, setPopOverOpen] = useState(false);

    useEffect(() => {
        const showParam = searchParams.get("show") || "16";
        setShowValue(showParam);
    }, [searchParams, pathname]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateAndSetParams(showValue);
    };

    const validateAndSetParams = (value: string) => {
        const parsedValue = Number(value);

        if (isNaN(parsedValue)) {
            setErrorMessage("Value must be a number");
            // setShowValue("16");
            setPopOverOpen(true); // Ensure popover stays open for error
        } else if (parsedValue <= 0) {
            setErrorMessage("Value must be greater than 0");
            // setShowValue("16");
            setPopOverOpen(true); // Ensure popover stays open for error
        } else {
            setErrorMessage(null);
            setPopOverOpen(false); // Close popover on valid input
            const params = new URLSearchParams(searchParams);
            params.set("show", value);
            // Reset the page parameter
            params.delete("page");
            router.replace(`${pathname}?${params.toString()}`);
        }

        // Update URL params for invalid inputs
        // if (errorMessage) {
        //     const params = new URLSearchParams(searchParams);
        //     params.set("show", "16");
        //     router.replace(`${pathname}?${params.toString()}`);
        // }
    };

    return (
        <div
            className="flex items-center sm:justify-center gap-[17px] mr-[10px] sm:mr-[25px]"
            key={`${pathname}${searchParams.toString()}`}
        >
            <label
                htmlFor="show"
                className="hidden sm:inline-block text-[20px] font-normal"
            >
                Show
            </label>

            <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
                <PopoverTrigger>
                    <form onSubmit={handleOnSubmit}>
                        <input
                            type="text"
                            id="show"
                            value={showValue}
                            onChange={(e) => setShowValue(e.target.value)}
                            onBlur={() => validateAndSetParams(showValue)}
                            className="w-[55px] h-[55px] flex items-center justify-center text-center text-[20px] text-gray font-normal"
                        />
                    </form>
                </PopoverTrigger>
                {errorMessage && (
                    <PopoverContent className="text-sm text-red-700">
                        {errorMessage}
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}

export default FilterShow;
