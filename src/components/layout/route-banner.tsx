"use client";

import { formatPathName } from "@/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function RouteBanner() {
    const path = formatPathName(usePathname());
    const { capitalizedWords, firstWordCapitalized } = path;

    return (
        <div className="wrapper h-[316px] grid place-content-center relative overflow-hidden bg-light-gray z-[-5]  shadow-lg">
            <div>
                <Image
                    src="/route-banner-bg.jpg"
                    alt="bg image"
                    width={1440}
                    height={316}
                    className="absolute inset-0 w-full h-full object-cover object-center z-[-1]"
                />

                {/* blur */}
                <div className="absolute inset-0 backdrop-blur-[2.5px] bg-white/50 z-[-1]"></div>
            </div>

            <div className="size-fit text-center  mb-[56px]">
                <div className="flex flex-col ">
                    <Image
                        src={"/logo.png"}
                        alt={`logo on ${firstWordCapitalized}`}
                        height={77}
                        width={77}
                        className="mx-auto object-contain object-center size-[77px] 
                        relative
                        bottom-[-16px]
                        
                        "
                    />
                    <h1 className="text-[48px] font-medium ">
                        {capitalizedWords}
                    </h1>
                </div>

                <p className="text-[16px] font-light flex items-center justify-center">
                    <span className="font-medium">
                        Home{" "}
                        <ChevronRight className="size-[20px] inline-block" />
                    </span>
                    {firstWordCapitalized}
                </p>
            </div>
        </div>
    );
}

export default RouteBanner;
