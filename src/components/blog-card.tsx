import { getOrdinal } from "@/utils";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IBlogCard {
    image: string;
    title: string;
    href: string;
    time: number;
    date: {
        day: number;
        month: string;
        year: number;
    };
}

function BlogCard({ image, title, href, time, date }: IBlogCard) {
    return (
        <article className="h-[555px] w-full lg:w-[393px] flex flex-col gap-[15px] lg:gap-[33px] mb-16 lg:mb-0">
            {/* image */}
            <div className="h-[393px] w-full lg:w-[393px] mx-auto">
                <Image
                    src={image}
                    alt={title}
                    width={393}
                    height={393}
                    className="object-contain object-center h-full w-full rounded-[10px]"
                />
            </div>

            {/* content */}
            <div className="text-center flex flex-col gap-3">
                <h4 className="text-[20px] font-normal">{title}</h4>

                <Link
                    href={href}
                    className="mx-auto underline underline-offset-[17px] decoration-2 text-[24px] font-medium"
                >
                    Read More
                </Link>

                <p className="text-[16px] font-light flex items-center justify-center gap-3 mt-5">
                    <span className="flex items-center justify-center gap-1.5">
                        <Clock className="inline-block font-bold w-[18.3px] [h-17.33px]" />
                        {time} min
                    </span>
                    <span className="flex items-center justify-center gap-1.5">
                        <Calendar className="ml-[3px] inline-block font-bold w-[18.3px] [h-17.33px]" />
                        <span>
                            {date.day}
                            <sup className="">{getOrdinal(date.day)}</sup>
                        </span>
                        {date.month} {date.year}
                    </span>
                </p>
            </div>
        </article>
    );
}

export default BlogCard;
