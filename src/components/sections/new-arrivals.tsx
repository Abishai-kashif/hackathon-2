import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { NEW_ARRIVAL_QUERY } from "@/queries";
import getData, { isError } from "@/utils";
import { ProductPreview } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import ErrorMessage from "../error-message";

async function NewArrivals() {
    const newArrival = await getData<ProductPreview>(NEW_ARRIVAL_QUERY);

    if (!newArrival) {
        return (
            <ErrorMessage
                className="text-black"
                message={"Something went wrong while fetching new Arrival"}
            />
        );
    }

    if (isError(newArrival)) {
        return <ErrorMessage message={newArrival.message} />;
    }

    const { name, image, slug } = newArrival;

    return (
        <section className="wrapper lg:h-[639px] pt-20 lg:pt-0 bg-light-yellow overflow-hidden flex flex-col-reverse lg:flex-row">
            {/* image */}
            <div>
                <Image
                    src={urlFor(image).url()}
                    alt={name}
                    height={1000}
                    width={1583}
                    className="object-contain object-center w-full h-full lg:w-[963px] lg:h-[799px]"
                />
            </div>

            {/* content */}
            <div className="flex flex-col gap-[33px] justify-center items-center text-center">
                <hgroup>
                    <h2 className="text-[24px] font-medium">New Arrivals</h2>
                    <h3 className="text-[48px] font-bold">{name}</h3>
                </hgroup>

                <Button variant={"outline"} size={"lg"} asChild>
                    <Link href={`/${slug.current}`}>Order Now</Link>
                </Button>
            </div>
        </section>
    );
}

export default NewArrivals;
