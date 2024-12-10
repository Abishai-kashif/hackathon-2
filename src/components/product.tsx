import Image from "next/image";

export interface IProduct {
    image: string;
    name: string;
    price: number | string;
}

function Product({ image, name, price }: IProduct) {
    return (
        <article className="mx-auto h-[397px] w-[287px] flex flex-col gap-[14px]">
            {/* image */}
            <div className="h-[287px] w-full">
                <Image
                    src={image}
                    alt="product"
                    width={287}
                    height={287}
                    className="object-contain object-center h-full w-full"
                />
            </div>

            {/* text */}
            <div className="text-black flex flex-col gap-[11px]">
                <h4 className="text-[16px]">{name}</h4>
                <p className="text-[24px] font-medium">Rs. {price}</p>
            </div>
        </article>
    );
}

export default Product;
