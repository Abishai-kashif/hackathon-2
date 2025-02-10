"use client"; // Required for interactivity

import { useState } from "react";
// import { Star, StarHalf } from "lucide-react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface IProps {
    rating?: number;
    maxStars?: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
}

const Stars = ({
    rating = 0,
    maxStars = 5,
    interactive = false,
    onRate,
}: IProps) => {
    const [hoverRating, setHoverRating] = useState(0);

    // Handle star click
    const handleClick = (index: number) => {
        const ratedNumber = index + 1;

        if (interactive && onRate) {
            setHoverRating(ratedNumber);
            onRate(ratedNumber);
        }
    };

    // Handle star hover
    // const handleHover = (index: number) => {
    //     if (interactive) {
    //         setHoverRating(index + 1);
    //     }
    // };

    // Reset hover state
    // const handleMouseLeave = () => {
    //     if (interactive) {
    //         setHoverRating(0);
    //     }
    // };

    return (
        <div className="flex gap-1">
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = hoverRating
                    ? starValue <= hoverRating
                    : starValue <= rating;
                const isHalfFilled = !hoverRating && starValue - 0.5 === rating;

                return (
                    <span
                        key={index}
                        className={`cursor-${interactive ? "pointer" : "default"} transition-colors ${
                            isFilled || isHalfFilled
                                ? "text-[#FFDA5B]"
                                : "text-[#EEEEEE]"
                        }`}
                        onClick={() => handleClick(index)}
                        // onMouseEnter={() => handleHover(index)}
                    >
                        {isHalfFilled ? (
                            <FaStarHalfAlt
                                className="size-[20px]"
                                strokeWidth={1}
                            />
                        ) : (
                            <FaStar
                                className="size-[20px]"
                                fill={isFilled ? "#FFDA5B" : "#EEEEEE"}
                            />
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default Stars;
