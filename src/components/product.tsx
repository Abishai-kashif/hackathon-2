import { urlFor } from "@/sanity/lib/image";
import { Image as IImage } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export interface IProps {
    slug: string;
    image: IImage;
    name: string;
    price: number;
}

function Product({ image, name, price, slug }: IProps) {
    return (
        <article className="mx-auto h-[397px] w-[287px] flex flex-col gap-[14px] group">
            {/* image */}
            <div className="h-[287px] w-full group-hover:opacity-60">
                <Image
                    src={urlFor(image).url()}
                    alt="product"
                    width={287}
                    height={287}
                    className="object-contain object-center h-full w-full"
                />
            </div>

            {/* text */}
            <div className="text-black flex flex-col gap-[11px]">
                <Link href={`/${slug}`}>
                    <h4 className="text-[16px]">{name}</h4>
                </Link>
                <p className="text-[24px] font-medium">
                    Rs. {formatPrice(price)}
                </p>
            </div>
        </article>
    );
}

export default Product;
