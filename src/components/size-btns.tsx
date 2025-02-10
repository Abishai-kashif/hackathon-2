"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
    sizes: string[];
    containerStyles?: string;
    btnStyles?: string;
}

function SizeBtns({ sizes, containerStyles, btnStyles }: IProps) {
    const [activatedBtn, setActivatedBtn] = useState(sizes[0]);

    return (
        <div className="space-y-[12px] mb-4">
            <h4 className="text-[14px] text-gray capitalize">Size</h4>

            <ul
                className={cn(
                    "flex items-center justify-center w-fit gap-x-[16px]",
                    containerStyles
                )}
            >
                {sizes.map((size, idx) => (
                    <li key={idx}>
                        <button
                            className={cn(
                                `size-[30px] flex items-center justify-center rounded-[5px] bg-azure text-[13px] ${activatedBtn === size && "bg-yellow"}`,
                                btnStyles
                            )}
                            onClick={() => setActivatedBtn(size)}
                        >
                            {size}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SizeBtns;
