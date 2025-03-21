import "dotenv/config";

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-30";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	"Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const token = assertValue(
	process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
	"Missing environment variable: NEXT_PUBLIC_SANITY_AUTH_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}

	return v;
}
