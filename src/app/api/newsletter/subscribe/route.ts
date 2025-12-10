import { NextResponse } from "next/server";
import { syncMailchimpContact } from "@/lib/services/mailchimp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source, resourceSlug } = body ?? {};

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 },
      );
    }

    const tags: string[] = ["newsletter"];

    if (source) {
      tags.push(String(source));
    }

    if (resourceSlug) {
      tags.push(`article:${String(resourceSlug)}`);
    }

    await syncMailchimpContact({
      email,
      statusIfNew: "subscribed",
      tags,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error handling newsletter signup:", error);
    return NextResponse.json(
      { success: false, error: "Unable to subscribe right now. Please try again later." },
      { status: 500 },
    );
  }
}
