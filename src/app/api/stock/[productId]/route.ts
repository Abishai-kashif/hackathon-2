import { STOCK_LEVELS_QUERY } from "@/queries";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		const product = await client.fetch(
			STOCK_LEVELS_QUERY,
			{
				productId: params.productId,
			},
			{
				cache: "no-cache",
			}
		);

		return NextResponse.json({
			stockLevel: product?.stockLevel || 0,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch stock level" },
			{ status: 500 }
		);
	}
}
