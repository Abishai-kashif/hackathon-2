import { NextResponse } from "next/server";
import shippo from "shippo";

if (!process.env.NEXT_PUBLIC_SHIPPO_KEY) {
	throw new Error("NEXT_PUBLIC_SHIPPO_KEY is not defined");
}

const client = shippo(process.env.NEXT_PUBLIC_SHIPPO_KEY);

export async function POST(req: Request) {
	try {
		const { trackingNumber, carrier } = await req.json();

		const tracking = await client.track.retrieve(carrier, trackingNumber);

		return NextResponse.json(tracking);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
