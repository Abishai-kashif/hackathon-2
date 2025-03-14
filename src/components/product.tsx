import { urlFor } from "@/sanity/lib/image";
import { Image as IImage } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { WishlistButton } from "./wishlist-button";

export interface IProps {
    id: string;
    slug: string;
    image: IImage;
    name: string;
    price: number;
    onRemove?: () => void;
}

function Product({ id, image, name, price, slug, onRemove }: IProps) {
    return (
        <article className="mx-auto h-[397px] w-[287px] flex flex-col gap-[14px] group">
            {/* image */}
            <div className="h-[287px] w-full relative group">
                <Link href={`/${slug}`}>
                    <Image
                        src={urlFor(image).url()}
                        alt="product"
                        width={287}
                        height={287}
                        className="object-contain object-center h-full w-full group-hover:opacity-60"
                    />
                </Link>

                <WishlistButton
                    onRemove={onRemove}
                    productId={id}
                    className="absolute top-4 right-0 z-10 hidden group-hover:block"
                />
            </div>
            {/* text */}
            <div className="text-black flex flex-col gap-[11px]">
                <h4 className="text-[16px]">{name}</h4>
                <p className="text-[24px] font-medium">
                    Rs. {formatPrice(price)}
                </p>
            </div>
        </article>
    );
}

export default Product;
