import CustomSeperator from "@/components/custom-separator";
import ImageGallery from "@/components/image-gallery";
import {
    calculateAverageStars,
    formatPathName,
    formatPrice,
    isError,
} from "@/utils";
import { Product } from "@/types";
import ProductBreadcrumb from "../product-breadcrumb";
import ProductQuantityCart from "../product-quantity-cart";
import {
    ExtraInfo,
    ExtraInfoList,
    ExtraInfoItem,
    ExtraInfoTag,
    ExtraInfoValue,
    ExtraInfoSeparator,
} from "@/components/extra-info";
import Stars from "../stars";
import ColorBtns from "../color-btns";
import SizeBtns from "../size-btns";
import ErrorMessage from "../error-message";
import { notFound } from "next/navigation";
import Image from "next/image";

const SOCIAL_ICONS = [
    { src: "/icons/fb-icon.png", alt: "Facebook", size: 20 },
    { src: "/icons/linkedin-icon.png", alt: "LinkedIn", size: 20 },
    { src: "/icons/twitter-icon.png", alt: "Twitter", size: 25 },
];

function SingleProduct({ product }: { product: Product }) {
    // Early error handling
    if (!product) notFound();
    if (isError(product)) return <ErrorMessage message={product.message} />;

    // Destructure product properties
    const {
        name,
        price,
        description,
        images,
        category,
        colors,
        reviews,
        sizes,
        sku,
        tags,
    } = product;

    const averageRating = calculateAverageStars(reviews);
    const reviewersCount = reviews.length;
    const formattedName = formatPathName(name).capitalizedWords;

    return (
        <section className="wrapper mx-auto px-7 sm:px-24 py-10">
            <div className="bg-white">
                <ProductBreadcrumb prodName={formattedName} />
                <div className="mx-auto mt-7">
                    {/* product */}
                    <div className="flex gap-14 flex-col md:flex-row flex-wrap overflow-hidden">
                        {/* product images */}
                        <ImageGallery images={images} />

                        {/* product content */}
                        <div className="md:pt-5 h-fit flex-1">
                            <div className="mb-14">
                                <h2 className="text-4xl lg:text-[42px] text-black mb-3 leading-snug">
                                    {name}
                                </h2>

                                <p className="font-medium text-[24px] text-gray">
                                    Rs. {formatPrice(price)}
                                </p>

                                {/* product rating */}
                                <div className="flex items-center gap-6  my-4">
                                    <div className="flex gap-x-[6px]">
                                        <Stars
                                            maxStars={5}
                                            rating={averageRating}
                                        />
                                    </div>

                                    <CustomSeperator className="w-[1.5px] h-7" />

                                    <span className="text-[13px] text-gray">
                                        {reviewersCount} Customer(s) Review
                                    </span>
                                </div>

                                {/* product description */}
                                <p className="text-[13px] text-black mb-5 max-w-[425px]">
                                    {description}
                                </p>

                                {/* size controls */}

                                <SizeBtns sizes={sizes} />

                                {/* color controls */}
                                <ColorBtns colors={colors} />

                                {/* <div className="flex items-center flex-wrap gap-x-4 gap-y-11 mt-7">  (this is a container if I separate the logic of add to cart & quantity controls) */}
                                <ProductQuantityCart product={product} />
                            </div>

                            <ProductMetaInfo
                                sku={sku}
                                category={category}
                                tags={tags}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ProductMetaInfo = ({
    sku,
    category,
    tags,
}: {
    sku: string;
    category: string;
    tags: string[];
}) => (
    <ExtraInfo>
        <ExtraInfoList>
            <MetaInfoItem label="SKU" value={sku} />
            <MetaInfoItem label="Category" value={category} />
            <MetaInfoItem label="Tags" value={tags.join(",  ")} />
            <SocialMediaInfo />
        </ExtraInfoList>
    </ExtraInfo>
);

const MetaInfoItem = ({ label, value }: { label: string; value: string }) => (
    <ExtraInfoItem>
        <ExtraInfoTag name={label} />
        <ExtraInfoSeparator />
        <ExtraInfoValue value={value} />
    </ExtraInfoItem>
);

const SocialMediaInfo = () => (
    <ExtraInfoItem>
        <ExtraInfoTag name="Share" />
        <ExtraInfoSeparator />
        <ExtraInfoValue
            className="flex gap-5 items-center"
            value={SOCIAL_ICONS.map((icon, index) => (
                <Image
                    key={index}
                    src={icon.src}
                    alt={icon.alt}
                    width={icon.size}
                    height={icon.size}
                    className={`size-[${icon.size}px] object-contain object-center`}
                    loading="lazy"
                />
            ))}
        />
    </ExtraInfoItem>
);

export default SingleProduct;
