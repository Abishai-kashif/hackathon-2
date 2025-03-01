interface AdditionalInfo {
	material: string;
	construction: string;
	care: string;
}

interface Review {
	stars: number;
	comment: string;
	user: string;
	date: string; // Date is typically stored as a string in ISO format
}

interface Image {
	_type: "image";
	asset: {
		_ref: string;
		_type: "reference";
	};
}

interface Slug {
	_type: "slug";
	current: string;
}

interface ProductCart {
	// id: string;
	name: string;
	price: number;
	description: string;
	currency: string;
	image: string;
	price_id: string;
}

interface Product {
	_id: string; // Sanity automatically adds this field
	name: string;
	price: number;
	description: string;
	stockLevel: number;
	tags: string[];
	sku: string;
	category: string;
	additionalInfo: AdditionalInfo;
	reviews: Review[];
	images: string[];
	colors: string[];
	sizes: string[];
	detailedDescription: string;
	slug: Slug;
	price_id: string | null;
}

type ProductPreview = Pick<Product, "_id" | "name" | "slug" | "price"> & {
	image: Image;
};

type ProductSearch = Pick<Product, "_id" | "name" | "slug">;

type Icon = React.ComponentType<{ className?: string }>;

type IconMap = {
	[key in keyof AdditionalInfo]: Icon;
};

interface SearchParams {
	searchParams: Promise<{ sort?: string; show?: string; page?: string }>;
}

interface ResolvedSearchParams {
	searchParams: {
		page?: string;
		show?: string;
		sort?: string;
	};
}

interface ErrorProps {
	error: Error & { digest?: string; statusCode?: number };
	reset: () => void;
}

interface FetchOptions {
	cache?: RequestCache;
	next?: {
		revalidate?: number;
		tags?: string[];
	};
	[key: string]: unknown;
}

interface CustomError {
	message: string;
}

interface ClerkUser {
	firstName: string;
	username: string;
	emailAddresses: { emailAddress: string }[];
}

export type {
	AdditionalInfo,
	Review,
	Image,
	Slug,
	Product,
	ProductPreview,
	ProductSearch,
	IconMap,
	SearchParams,
	ResolvedSearchParams,
	ErrorProps,
	FetchOptions,
	ProductCart,
	CustomError,
	ClerkUser,
};
