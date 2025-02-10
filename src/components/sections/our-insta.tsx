import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

function OurInsta() {
    return (
        <section className="wrapper h-[450px] flex items-center justify-center relative overflow-hidden bg-transparent">
            <div className="hero-image z-[-1]">
                <Image
                    src="/home/banner-bg.jpg"
                    fill
                    alt="bg image"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-azure/90" />
            </div>

            <div className="size-fit text-center space-y-[18px]">
                <div>
                    <h2 className="text-[45px] sm:text-[60px] p-1 sm:p-0 font-bold">
                        Our Instagram
                    </h2>

                    <p className="text-[20px] font-normal">
                        Follow our store on Instagram
                    </p>
                </div>

                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className="shadow-xl mx-auto hover:bg-[#fbf9f9] hover:opacity-95 hover:scale-[1.01]"
                    asChild
                >
                    <Link
                        href={"https://www.instagram.com/abi_zeries_official/"}
                        target="_blank"
                    >
                        Follow Us
                    </Link>
                </Button>
            </div>
        </section>
    );
}

export default OurInsta;
