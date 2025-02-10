import Image from "next/image";
import Link from "next/link";

interface IProp {
    image: string;
    category: string;
    title: string;
    para: string;
    href: string;
}

function BlogPost({ image, category, title, para, href }: IProp) {
    return (
        <article className="md:w-[810px] w-full h-auto">
            {/* image */}
            <div className="h-[500px] md:w-[807px] w-full mx-auto rounded-[10px] overflow-hidden">
                <Image
                    src={image}
                    alt="blog post"
                    height={500}
                    width={817}
                    className="size-full object-cover object-center"
                />
            </div>

            {/* credentials */}
            <div className="flex flex-wrap items-center justify-between sm:h-[24px] h-auto w-full sm:w-[349px] mt-5">
                {/* blogs admin */}
                <div className="size-fit flex gap-2">
                    <Image
                        src={"/icons/admin-icon.png"}
                        alt="admin icon"
                        height={20}
                        width={20}
                        className="size-[20px] object-contain object-center"
                    />
                    <span className="text-[16px] font-normal text-gray">
                        Admin
                    </span>
                </div>

                {/* blogs date */}
                <div className="size-fit flex gap-2">
                    <Image
                        src={"/icons/calender-icon.png"}
                        alt="calender icon"
                        height={20}
                        width={20}
                        className="size-[20px] object-contain object-center"
                    />
                    <span className="text-[16px] font-normal text-gray">
                        14 Oct 2022
                    </span>
                </div>

                {/* blogs category */}
                <div className="size-fit flex gap-2">
                    <Image
                        src={"/icons/tag-icon.png"}
                        alt="admin icon"
                        height={24}
                        width={24}
                        className="size-[24px] object-contain object-center"
                    />
                    <span className="text-[16px] font-normal text-gray capitalize">
                        {category}
                    </span>
                </div>
            </div>

            {/* content */}
            <div>
                <h2 className="text-[30px] font-medium mt-4 mb-3">{title}</h2>

                <p className="text-[15px] font-normal text-gray leading-[152%] mb-8">
                    {para}
                </p>

                <Link
                    href={href}
                    className="text-[16px] underline underline-offset-[16px]"
                >
                    Read more
                </Link>
            </div>
        </article>
    );
}

export default BlogPost;
