"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function FilterSortby() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleValueChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center sm:justify-center gap-[17px] ">
            <label
                htmlFor="sort"
                className="text-[20px] font-normal hidden sm:inline-block"
            >
                Short by
            </label>
            <Select
                defaultValue={searchParams.get("sort")?.toString() || "default"}
                onValueChange={(value) => handleValueChange(value)}
            >
                <SelectTrigger
                    className="w-[188px] h-[55px] text-[20px] pl-[27px] font-normal text-gray capitalize rounded-none"
                    id="sort"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem className="text-[20px]" value="default">
                            Default
                        </SelectItem>
                        <SelectItem className="text-[20px]" value="name">
                            Name
                        </SelectItem>
                        <SelectItem className="text-[20px]" value="price">
                            Price
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FilterSortby;
