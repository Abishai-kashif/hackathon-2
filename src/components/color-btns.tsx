"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
    colors: string[];
    containerStyles?: string;
    btnStyles?: string;
}

function ColorBtns({ colors, containerStyles, btnStyles }: IProps) {
    const [activatedBtn, setActivatedBtn] = useState(colors[0]);

    return (
        <div className="space-y-[12px] mb-4">
            <h4 className="text-[14px] text-gray capitalize">Color</h4>

            <ul
                className={cn(
                    "flex items-center justify-center w-fit gap-x-[16px]",
                    containerStyles
                )}
            >
                {colors.map((color, idx) => (
                    <li
                        key={idx}
                        className="p-1 relative flex items-center justify-center"
                    >
                        <button
                            className={cn(
                                `border border-black/75 rounded-full size-[30px] opacity-80 ${activatedBtn === color ? "opacity-100" : "hover:scale-110 transition-transform "}`,
                                btnStyles
                            )}
                            style={{
                                background: color,
                            }}
                            onClick={() => setActivatedBtn(color)}
                        >
                            {activatedBtn === color && (
                                <div className="absolute inset-0 border-[2.5px] border-black/80 rounded-full" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ColorBtns;
