import Image from "next/image";
import FilterSortby from "./filter-sortby";
import FilterShow from "./filter-show";
import ResultsCount from "./results-count";

// Reusable icon component
const FilterIcon = ({
    src,
    alt,
    size,
}: {
    src: string;
    alt: string;
    size: number;
}) => (
    <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-contain w-[${size}px] h-[${size}px]`}
        aria-hidden="true"
    />
);

function FilterBar() {
    return (
        <div className="bg-azure flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between px-5 lg:px-20 py-3 lg:py-0 gap-5 h-auto lg:h-[100px] w-full">
            {/* Left Section */}
            <div className="flex items-center justify-evenly gap-[18px] ml-auto sm:ml-0">
                <div className="flex items-center gap-[12px]">
                    <FilterIcon
                        src="/icons/filter-icon.png"
                        alt="Filter"
                        size={25}
                    />
                    <span className="text-[20px] font-normal">Filter</span>
                </div>

                <FilterIcon
                    src="/icons/grid-icon.png"
                    alt="Grid view"
                    size={28}
                />
                <FilterIcon
                    src="/icons/view-list-icon.png"
                    alt="List view"
                    size={24}
                />

                {/* Use the ResultsCount component */}
                <ResultsCount />
            </div>

            {/* Right Section */}
            <nav className="flex sm:items-center" aria-label="Filter controls">
                <FilterShow />
                <FilterSortby />
            </nav>
        </div>
    );
}

export default FilterBar;
