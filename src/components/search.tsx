import { Search as SearchIcon } from "lucide-react";

function Search() {
    return (
        <div className="relative w-full sm:size-fit mx-auto">
            <input
                type="text"
                className="peer text-[16px] mx-auto w-full sm:w-[311px] h-[58px] border border-gray rounded-[10px] py-[9px] pl-5"
            />
            <SearchIcon className="peer-focus:text-gray text-[24px] size-[24px] absolute top-1/2 -translate-y-1/2 right-3" />
        </div>
    );
}

export default Search;
