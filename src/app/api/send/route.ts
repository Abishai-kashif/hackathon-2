import { EmailTemplate } from "@/components/resend/email-template";
import { ContactUsUser } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
	try {
		const contactUsUser: ContactUsUser = await req.json();

		// Add validation
		if (!contactUsUser.email || !contactUsUser.message) {
			return NextResponse.json(
				{ error: "Email and message are required" },
				{ status: 400 }
			);
		}

		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: ["abishaikashif975@gmail.com"],
			subject:
				contactUsUser.subject || "New Message from Contact Us Form",
			react: EmailTemplate({
				name: contactUsUser.name,
				email: contactUsUser.email,
				userSubject: contactUsUser.subject,
				message: contactUsUser.message,
			}),
		});

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
};
