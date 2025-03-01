import { client } from "@/sanity/lib/client";
import { ClerkUser, CustomError, FetchOptions } from "@/types";
import { CartEntry } from "use-shopping-cart/core";

const DEFAULT_OPTIONS: FetchOptions = {
	cache: "no-cache",
};

export default async function getData<T>(
	query: string,
	variables: Record<string, unknown> = {},
	options: FetchOptions = {}
): Promise<T | CustomError> {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	try {
		return await client.fetch<T>(query, variables, mergedOptions);
	} catch (error) {
		console.error("Data fetch error:", error);

		return {
			message:
				error instanceof Error
					? error.message
					: "An unknown error occurred during data fetch",
			...(error instanceof Error &&
				error.cause && { cause: error.cause }),
		};
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isError(obj: any): obj is CustomError {
	if ("message" in obj) {
		return true;
	}
	return false;
}

export function getOrdinal(day: number): string {
	// Handle the 'teens' special case (11th, 12th, 13th, etc.)
	if (day % 100 >= 11 && day % 100 <= 13) {
		// return `${day}th`;
		return "th";
	}

	// Map for suffixes based on the last digit
	const suffixMap: { [key: string]: string } = {
		"1": "st",
		"2": "nd",
		"3": "rd",
	};

	// Get the appropriate suffix or default to 'th'
	const lastDigit = (day % 10).toString();
	const suffix = suffixMap[lastDigit] || "th";
	// return `${day}${suffix}`;

	return suffix;
}

interface FormatPathNames {
	capitalizedWords: string;
	firstWordCapitalized: string;
}

export function formatPathName(path: string): FormatPathNames {
	// Split the path into words based on hyphens
	const words = path.replace("/", "").split("-");

	// Capitalize each word
	const capitalizedWords = words
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(" ");

	// Capitalize only the first word, keep others lowercase
	const firstWordCapitalized = words
		.map((word, index) => {
			if (index === 0) {
				return (
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);
			}
			return word.toLowerCase();
		})
		.join(" ");

	// Return the results as an object
	return {
		capitalizedWords,
		firstWordCapitalized,
	};
}

export function getSubtotal(cart: CartEntry[]): string {
	const subtotal = cart.reduce((total, item) => (total += item.price), 0);
	return formatPrice(subtotal);
}

export function getTotal(cart: CartEntry[]): string {
	const total = cart.reduce((total, item) => (total += item.value), 0);
	return formatPrice(total);
}

export function formatPrice(num: number): string {
	return num.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
// Function to fetch the total number of products
export async function fetchTotalProductsCount() {
	try {
		const count = await client.fetch(`count(*[_type == "product"])`);
		return count;
	} catch (error) {
		console.error("Error fetching total products count:", error);
		return 0;
	}
}

// Calculate the total number of pages
export async function getTotalPages(pageSize = 16) {
	const totalProducts = await fetchTotalProductsCount();
	return Math.ceil(totalProducts / pageSize);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

export function calculateAverageStars(reviews: { stars: number }[]) {
	if (reviews.length === 0) return 0; // Handle case where there are no reviews
	const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0); // Sum up all stars
	return totalStars / reviews.length;
}

// Helper function to get user's display name
export function getUserGreeting(user: ClerkUser) {
	return (
		user.firstName ||
		user.username ||
		user.emailAddresses[0]?.emailAddress.split("@")[0] ||
		"Valued Customer"
	);
}
