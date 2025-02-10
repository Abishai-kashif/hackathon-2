import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdditionalInfo, IconMap, Review } from "@/types";
import { calculateAverageStars } from "@/utils";
import { Leaf, Puzzle, Droplets } from "lucide-react";
import Image from "next/image";
import Stars from "../stars";

const iconMap: IconMap = {
    material: Leaf,
    construction: Puzzle,
    care: Droplets,
};

function DetailedDescription({
    image,
    name,
    detailedDescription,
}: {
    image: string;
    name: string;
    detailedDescription: string;
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
                {/* Text Content */}
                <div className="flex-1 max-w-2xl lg:max-w-none lg:w-1/2 space-y-6">
                    <h2 className="text-[36px] font-semibold text-black">
                        About the {name}
                    </h2>
                    <div className="text-[18px] text-gray max-w-3xl">
                        <p className="text-justify">{detailedDescription}</p>
                    </div>
                </div>

                {/* Image Container */}
                <div className="flex-shrink-0 relative w-full lg:w-1/2 h-[400px] sm:h-[580px] ">
                    <div className="absolute inset-0" />
                    <Image
                        src={image}
                        alt={name}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
            </div>
        </div>
    );
}

export function ProductSpecifications({
    additionalInfo,
}: {
    additionalInfo: AdditionalInfo;
}) {
    return (
        <section className="max-w-4xl mx-auto my-12 px-4">
            <h2 className="text-[27px] font-medium mb-8 text-black">
                Product Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(additionalInfo).map(([key, value]) => {
                    const Icon = iconMap[key.toLowerCase()] || Leaf;

                    return (
                        <div
                            key={key}
                            className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border border-gray/30 hover:border-gray/50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-azure/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0" />

                            <div className="relative z-10">
                                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-light-yellow/30 group-hover:bg-light-yellow/50 transition-colors">
                                    <Icon className="w-6 h-6 text-yellow" />
                                </div>

                                <h3 className="text-lg font-medium text-black/85 mb-2 capitalize">
                                    {key}
                                </h3>
                                <p className="text-gray leading-relaxed">
                                    {value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function Reviews({ reviews }: { reviews: Review[] }) {
    const averageRating = calculateAverageStars(reviews);

    return (
        <section className="max-w-4xl mx-auto my-12 px-4">
            <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                        {averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">/ 5.0</span>
                </div>
                <div>
                    <Stars rating={averageRating} />
                    <p className="text-sm text-gray-600 mt-1">
                        {reviews.length} verified reviews
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <article
                        key={index}
                        className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-light-gray/30 hover:border-light-gray/80"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray/60 flex items-center justify-center">
                                    <span className="font-medium text-black">
                                        {review.user.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {review.user}
                                    </h3>
                                    <time className="text-sm text-gray-500">
                                        {new Date(
                                            review.date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </div>

                            <Stars rating={review.stars} />

                            <p className="text-gray-700 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function SingleProductHighlight({
    image,
    name,
    detailedDescription,
    additionalInfo,
    reviews,
}: IProps) {
    return (
        <section className="wrapper mx-auto px-7 sm:px-24 py-10">
            <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-[53px] gap-y-2 mb-10">
                    <TabsTrigger
                        value="reviews"
                        className="font-normal text-[24px] text-gray hover:-translate-y-1 transition duration-150"
                    >
                        Reviews [{reviews.length}]
                    </TabsTrigger>
                    <TabsTrigger
                        value="additional"
                        className="font-normal text-[24px] text-gray hover:-translate-y-1 transition duration-150"
                    >
                        Additional Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="description"
                        className="font-normal text-[24px] text-gray hover:-translate-y-1 transition duration-150"
                    >
                        Description
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="reviews">
                    <Reviews reviews={reviews} />
                </TabsContent>
                <TabsContent value="additional">
                    <ProductSpecifications additionalInfo={additionalInfo} />
                </TabsContent>
                <TabsContent value="description">
                    <DetailedDescription
                        image={image}
                        name={name}
                        detailedDescription={detailedDescription}
                    />
                </TabsContent>
            </Tabs>
        </section>
    );
}

interface IProps {
    image: string;
    name: string;
    detailedDescription: string;
    additionalInfo: AdditionalInfo;
    reviews: Review[];
}

export default SingleProductHighlight;
