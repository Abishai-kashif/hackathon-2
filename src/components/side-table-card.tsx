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
        <article className="w-full h-auto sm:h-[562px] sm:w-[605px] relative flex flex-col overflow-hidden">
            {/* image */}
            <div className="h-full w-full">
                <Image
                    src={productImage}
                    alt={productName}
                    width={700}
                    height={900}
                    className="object-contain object-center h-full w-full"
                />
            </div>

            {/* name & link to product */}
            <div
                className={`flex flex-col gap-[]  relative sm:left-[100px] top-[-60px] ${
                    productImage.endsWith("2.png")
                        ? "sm:top-[-119.9px]"
                        : "sm:top-[-160px]"
                }`}
            >
                <h3 className="font-medium text-[36px]">{productName}</h3>
                <Link
                    href={href}
                    className="mt-4 underline underline-offset-[19px] decoration-2 text-[24px] font-medium"
                >
                    View More
                </Link>
            </div>
        </article>
    );
}

export default SideTableCard;
