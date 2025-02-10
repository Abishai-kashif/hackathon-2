"use client";

import Image from "next/image";
import { useState } from "react";

function SmallImages({
    images,
    containerClasses,
    imageClasses,
    onImageClick,
}: {
    images: string[];
    containerClasses: string;
    imageClasses: string;
    onImageClick: (image: string) => void;
}) {
    return (
        <ul className={containerClasses}>
            {Object.values(images).map((image: string, idx: number) => (
                <li key={idx} className={imageClasses}>
                    <Image
                        src={image}
                        width={76}
                        height={80}
                        alt={`image ${idx + 1}`}
                        className="h-[80px] w-[76px] object-contain object-center cursor-pointer mx-auto"
                        onClick={() => onImageClick(image)}
                    />
                </li>
            ))}
        </ul>
    );
}

function MainImage({ image, classes }: { image: string; classes: string }) {
    return (
        <div className={classes}>
            <Image
                src={image}
                width={425}
                height={500}
                alt="main image"
                className="h-full w-full object-contain object-center mx-auto"
            />
        </div>
    );
}

function ImageGallery({ images }: { images: string[] }) {
    const [mainImage, setMainImage] = useState(images[0]);

    const HandleImageClick = (image: string) => {
        setMainImage(image);
    };

    return (
        <div className="grid gap-6 xl:grid-cols-5">
            <SmallImages
                images={images}
                containerClasses="order-last xl:order-none flex xl:flex-col gap-4"
                imageClasses="overflow-hidden rounded-[10px] h-[80px] w-[76px] bg-light-yellow flex items-center justify-center"
                onImageClick={HandleImageClick}
            />

            <MainImage
                image={mainImage}
                classes="lg:col-span-4 relative overflow-hidden rounded-[10px] w-full h-[300px] sm:h-[500px] sm:w-[425px] bg-light-yellow flex items-center justify-center"
            />
        </div>
    );
}

export default ImageGallery;
