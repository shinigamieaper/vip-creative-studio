import { NextResponse } from "next/server";
import { syncMailchimpContact, MailchimpApiError } from "@/lib/services/mailchimp";

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

    try {
      await syncMailchimpContact({
        email,
        statusIfNew: "subscribed",
        tags,
      });
    } catch (error) {
      if (error instanceof MailchimpApiError && error.status >= 400 && error.status < 500) {
        // Mailchimp thinks the email is invalid/fake or otherwise not acceptable
        const message =
          error.detail ||
          error.message ||
          "Please enter a valid email address.";

        return NextResponse.json({ success: false, error: message }, { status: 400 });
      }

      // eslint-disable-next-line no-console
      console.error("Mailchimp error during newsletter signup:", error);
      throw error;
    }

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
