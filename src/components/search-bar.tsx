"use client";

import getData, { isError } from "@/utils";
import { SearchIcon, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import { SEARCH_RESULTS_QUERY } from "@/queries";
import Link from "next/link";
import { ProductSearch } from "@/types";
import { useRouter } from "next/navigation";

function SearchBar() {
    const [query, setQuery] = useQueryState(
        "query",
        parseAsString.withDefault("")
    );
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<ProductSearch[]>([]);
    const [selectedItem, setSelectedItem] = useState(-1);

    const { replace } = useRouter();

    const searchSanityProducts = async (searchTerm: string) => {
        if (searchTerm === "") {
            return [];
        }

        const results = await getData<ProductSearch[]>(SEARCH_RESULTS_QUERY, {
            searchTerm,
        });

        return results;
    };

    const handleOnQueryChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsLoading(true);
        setIsOpen(true);

        const value = e.target.value;

        setQuery(value);

        const results = await searchSanityProducts(value);

        // early error handling
        if (isError(results)) {
            console.error("error", results.message);
            setIsOpen(false);
            setIsLoading(false);
            setSearchResults([]);
            return;
        }

        if (results.length === 0) {
            console.log("no results");
            setIsOpen(false);
        } else {
            console.log("results found");
            setIsOpen(true);
        }

        setSearchResults(results);
        setIsLoading(false);
    };

    const handleClose = () => {
        setQuery("");
        setSearchResults([]);
        setIsOpen(false);
        setSelectedItem(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (selectedItem < searchResults.length) {
            if (e.key === "ArrowUp" && selectedItem > 0) {
                setSelectedItem((prev) => prev - 1);
            } else if (
                e.key === "ArrowDown" &&
                selectedItem < searchResults.length - 1
            ) {
                setSelectedItem((prev) => prev + 1);
            } else if (e.key === "Enter" && selectedItem >= 0) {
                const url = `/${searchResults[selectedItem].slug}`;
                setIsOpen(false);
                replace(url);
            }
        } else {
            setSelectedItem(-1);
        }
    };

    return (
        <div className="relative">
            {/* search input */}
            <div>
                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="w-full h-14 px-6 pr-14 text-lg text-black placeholder-gray rounded-t-lg focus:outline-gray focus:outline-1 transition-all"
                        value={query}
                        type="text"
                        placeholder="Search products..."
                        onChange={handleOnQueryChange}
                        onKeyDown={handleKeyDown}
                    />
                    {query === "" ? (
                        <SearchIcon
                            className="opacity-60 hover:opacity-100 transition-opacity text-black text-[24px] size-[24px] absolute right-4 top-1/2
                    -translate-y-1/2"
                        />
                    ) : (
                        <X
                            className="opacity-60 hover:opacity-100 transition-opacity text-black text-[24px] size-[24px] absolute right-4 top-1/2
                    -translate-y-1/2"
                            onClick={handleClose}
                        />
                    )}
                </form>
            </div>

            {/* search filters */}
            {isOpen && (
                <div className="">
                    {isLoading ? (
                        <div className="text-center text-black text-[18px] py-5">
                            Searching....
                        </div>
                    ) : (
                        <ul className="divide-y flex flex-col max-h-[350px] overflow-y-auto mt-3">
                            {searchResults.map((prod, idx) => (
                                <li
                                    key={prod._id}
                                    className="text-center text-black text-[18px]"
                                >
                                    <Link
                                        href={`/${prod.slug}`}
                                        className={`py-5 inline-block w-full ${idx === selectedItem ? "bg-light-gray/30" : "hover:bg-light-gray/30"}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                    >
                                        {prod.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
