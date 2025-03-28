import Image from "next/image";
import Link from "next/link";

function SideTableCard({
    productImage,
    productName,
    href,
}: {
    productImage: string;
    productName: string;
    href: string;
}) {
    return (
        <article className="w-full  sm:-space-y-20 sm:w-[605px] sm:h-[562px] relative grid">
            {/* image */}
            <div className="max-w-[500px] aspect-square self-end justify-self-end">
                <Image
                    src={productImage}
                    alt={productName}
                    width={700}
                    height={900}
                    className="object-center object-contain "
                />
            </div>

            {/* name & link to product */}
            <div className={`flex flex-col sm:mt-0`}>
                <h3 className="font-medium text-[28px] sm:text-[36px]">
                    Side Table
                </h3>
                <Link
                    href={href}
                    className="mt-4 underline underline-offset-[19px] decoration-2 text-[18px] sm:text-[24px] font-medium"
                >
                    View More
                </Link>
            </div>
        </article>
    );
}

export default SideTableCard;
