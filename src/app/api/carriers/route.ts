// app/api/carriers/route.ts
import { NextResponse } from "next/server";

const client = require("shippo")(process.env.NEXT_PUBLIC_SHIPPO_KEY);

export async function GET() {
	try {
		const carriers = await client.carrier.list();
		return NextResponse.json(carriers.results);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
