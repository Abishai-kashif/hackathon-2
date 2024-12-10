import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

function NewArrivals() {
    return (
        <section className="wrapper lg:h-[639px] pt-20 lg:pt-0 bg-light-yellow overflow-hidden flex flex-col-reverse lg:flex-row">
            {/* image */}
            <div>
                <Image
                    src={"/home/Asgaard sofa 1.png"}
                    alt="new arrival"
                    height={799}
                    width={983}
                    className="object-contain object-center w-full h-full lg:w-[963px] lg:h-[799px]"
                />
            </div>

            {/* content */}
            <div className="flex flex-col gap-[33px] justify-center items-center text-center">
                <hgroup>
                    <h5 className="text-[24px] font-medium">New Arrivals</h5>
                    <h3 className="text-[48px] font-bold">Asgaard sofa</h3>
                </hgroup>

                <Button variant={"outline"} size={"lg"}>
                    Order Now
                </Button>
            </div>
        </section>
    );
}

export default NewArrivals;
