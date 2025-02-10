import Image from "next/image";

interface IProp {
    image: string;
    title: string;
    date: string;
}

function RecentPost({ image, title, date }: IProp) {
    return (
        <article className="flex gap-3 items-center">
            {/* image */}
            <div className="size-[80px] shrink-0 mx-auto rounded-[10px] overflow-hidden">
                <Image
                    src={image}
                    alt="blog post"
                    height={500}
                    width={817}
                    className="size-full object-cover object-center"
                />
            </div>

            {/* content */}
            <div>
                <h3 className="text-[14px] font-normal text-black mb-0.5">
                    {title}
                </h3>
                <div className="text-[12px] font-normal text-gray">{date}</div>
            </div>
        </article>
    );
}

export default RecentPost;
